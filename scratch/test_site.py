import asyncio
import sys
import os
import time
import subprocess
import json
from playwright.async_api import async_playwright

# Setup target URL from arguments or default to the deployed Vercel URL
target_url = "https://echogrow-three.vercel.app"
if len(sys.argv) > 1:
    target_url = sys.argv[1]

# Normalize target URL
target_url = target_url.rstrip("/")

print("==================================================")
print(f"   STARTING INTEGRATION & DATABASE E2E TESTS     ")
print(f"   Target URL: {target_url}                      ")
print("==================================================")

timestamp = int(time.time())
test_prefix = f"e2e-test-{timestamp}"

# Helper to verify DB records using node utility
def verify_db_record(action, email):
    # Run the node utility script in a subprocess
    cmd = ["node", "scratch/verify_db.js", action, email]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=os.getcwd())
    
    if result.returncode == 0:
        try:
            return True, json.loads(result.stdout.strip().split("\n")[-1])
        except Exception:
            return True, {"raw_output": result.stdout}
    else:
        return False, {"error": result.stderr or result.stdout}

# Helper to run database cleanup
def cleanup_db():
    print(f"\n[Cleanup] Cleaning up database records with prefix '{test_prefix}'...")
    cmd = ["node", "scratch/verify_db.js", "cleanup", test_prefix]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=os.getcwd())
    if result.returncode == 0:
        print(f"[Cleanup] Done. Output: {result.stdout.strip()}")
    else:
        print(f"[Cleanup] Failed to clean up database records: {result.stderr or result.stdout}")

async def test_page_loads(page, url_path, expected_text):
    full_url = f"{target_url}{url_path}"
    print(f"-> Testing page: {full_url}")
    await page.goto(full_url)
    try:
        await page.wait_for_load_state("domcontentloaded", timeout=5000)
    except Exception:
        pass
    
    # Wait for the page content to load and check if expected text is present
    body_text = await page.inner_text("body")
    if expected_text.lower() in body_text.lower():
        print(f"   [PASS] Page {url_path} loaded successfully and contains '{expected_text}'")
        return True
    else:
        print(f"   [FAIL] Page {url_path} loaded but did not contain expected text '{expected_text}'")
        return False

async def run_tests():
    success = True
    playwright_session = None
    browser = None
    context = None
    
    try:
        playwright_session = await async_playwright().start()
        browser = await playwright_session.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        context = await browser.new_context()
        context.set_default_timeout(10000) # 10 seconds timeout
        page = await context.new_page()

        # ----------------------------------------------------
        # SCENARIO 1: Navigating and Verifying Page Loads
        # ----------------------------------------------------
        print("\n--- Scenario 1: Page Navigation and Verification ---")
        pages_to_test = [
            ("/", "Turn Your Business Into a Brand"),
            ("/services", "Services & Solutions"),
            ("/portfolio", "Creative Campaigns"),
            ("/pricing", "Simple Creative Pricing"),
            ("/how-it-works", "How EchoGrow Works"),
            ("/about", "About"),
            ("/contact", "Tell Us About Your Brand")
        ]
        
        for path, expected_text in pages_to_test:
            if not await test_page_loads(page, path, expected_text):
                success = False

        # ----------------------------------------------------
        # SCENARIO 2: Services Category Filtering
        # ----------------------------------------------------
        print("\n--- Scenario 2: Services Category Filtering ---")
        await page.goto(f"{target_url}/services")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # Count all services initially
        initial_cards = await page.locator("section article").count()
        print(f"-> Initial service cards: {initial_cards}")
        
        # Click on "Audio" filter
        audio_filter_btn = page.get_by_role("button", name="Audio", exact=True)
        await audio_filter_btn.wait_for(state="visible")
        await audio_filter_btn.click()
        await page.wait_for_timeout(1000) # Wait for animation
        
        # Check filtered cards
        filtered_cards = await page.locator("section article").count()
        print(f"-> Service cards after 'Audio' filter: {filtered_cards}")
        
        # The Audio category should contain "Custom Ad Music & Jingles"
        card_texts = await page.locator("section article").all_inner_texts()
        is_filtered_correctly = any("Custom Ad Music" in text for text in card_texts) and filtered_cards < initial_cards
        
        if is_filtered_correctly:
            print("   [PASS] Services category filtering is working.")
        else:
            print("   [FAIL] Services category filtering did not yield expected results.")
            success = False

        # ----------------------------------------------------
        # SCENARIO 3: Portfolio Category Filtering
        # ----------------------------------------------------
        print("\n--- Scenario 3: Portfolio Category Filtering ---")
        await page.goto(f"{target_url}/portfolio")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        initial_portfolios = await page.locator("section article").count()
        print(f"-> Initial portfolio cards: {initial_portfolios}")
        
        # Click on "Food & Beverage" filter
        food_filter_btn = page.get_by_role("button", name="Food & Beverage", exact=True)
        await food_filter_btn.wait_for(state="visible")
        await food_filter_btn.click()
        await page.wait_for_timeout(1000)
        
        filtered_portfolios = await page.locator("section article").count()
        print(f"-> Portfolio cards after 'Food & Beverage' filter: {filtered_portfolios}")
        
        port_texts = await page.locator("section article").all_inner_texts()
        is_port_filtered = any("SpiceGlow" in text or "BrewBuzz" in text for text in port_texts) and filtered_portfolios < initial_portfolios
        
        if is_port_filtered:
            print("   [PASS] Portfolio category filtering is working.")
        else:
            print("   [FAIL] Portfolio category filtering did not yield expected results.")
            success = False

        # ----------------------------------------------------
        # SCENARIO 4: Home Page - Newsletter Subscriber Form
        # ----------------------------------------------------
        print("\n--- Scenario 4: Home Page Subscriber Form E2E ---")
        await page.goto(f"{target_url}/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        sub_email = f"{test_prefix}-sub@example.com"
        print(f"-> Submitting subscriber form with email: {sub_email}")
        
        # Select email input under the form
        email_input = page.locator("#subscriber-form input[name='email']")
        await email_input.wait_for(state="visible")
        await email_input.fill(sub_email)
        
        # Click submit
        submit_btn = page.locator("#subscriber-form button[type='submit']")
        await submit_btn.click()
        
        # Verify UI success message (wait for text to appear in page)
        success_text_locator = page.locator("text=requested a free audit review")
        await success_text_locator.wait_for(state="visible", timeout=10000)
        print("   [PASS] UI displayed subscriber success message.")
        
        # Verify Database Write
        db_success, db_data = verify_db_record("verify-subscriber", sub_email)
        if db_success:
            print(f"   [PASS] Database verify: Subscriber successfully inserted (ID: {db_data.get('id')})")
        else:
            print(f"   [FAIL] Database verify failed for subscriber: {db_data.get('error')}")
            success = False

        # ----------------------------------------------------
        # SCENARIO 5: Portfolio Page - Portfolio Inquiry Form
        # ----------------------------------------------------
        print("\n--- Scenario 5: Portfolio Inquiry Form E2E ---")
        await page.goto(f"{target_url}/portfolio")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        inquiry_email = f"{test_prefix}-port@example.com"
        inquiry_msg = f"This is an E2E test inquiry for portfolio page. Timestamp: {timestamp}."
        print(f"-> Submitting portfolio inquiry: {inquiry_email}")
        
        await page.locator("#portfolio-inquiry-form input[name='email']").fill(inquiry_email)
        await page.locator("#portfolio-inquiry-form textarea[name='message']").fill(inquiry_msg)
        await page.locator("#portfolio-inquiry-form button[type='submit']").click()
        
        success_text_locator = page.locator("text=Inquiry Received")
        await success_text_locator.wait_for(state="visible", timeout=10000)
        print("   [PASS] UI displayed portfolio inquiry success message.")
        
        # Verify Database Write
        db_success, db_data = verify_db_record("verify-lead", inquiry_email)
        if db_success:
            print(f"   [PASS] Database verify: Portfolio Lead successfully inserted")
            print(f"          Name: '{db_data.get('contactName')}', Business: '{db_data.get('businessName')}', Goals: '{db_data.get('goals')}'")
        else:
            print(f"   [FAIL] Database verify failed for portfolio inquiry: {db_data.get('error')}")
            success = False

        # ----------------------------------------------------
        # SCENARIO 6: How It Works Page - Quick Contact Form
        # ----------------------------------------------------
        print("\n--- Scenario 6: How It Works Quick Contact Form E2E ---")
        await page.goto(f"{target_url}/how-it-works")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        quick_name = f"E2E Quick User {timestamp}"
        quick_email = f"{test_prefix}-quick@example.com"
        quick_goals = f"Help us grow our brand presence. Quick E2E test."
        print(f"-> Submitting quick contact form: {quick_email}")
        
        await page.locator("#quick-contact-form input[name='contact-name']").fill(quick_name)
        await page.locator("#quick-contact-form input[name='email']").fill(quick_email)
        await page.locator("#quick-contact-form textarea[name='goals']").fill(quick_goals)
        await page.locator("#quick-contact-form button[type='submit']").click()
        
        # Expect the parent container or page to show the thank you message
        success_text_locator = page.locator("text=Your quick brief has been received")
        await success_text_locator.wait_for(state="visible", timeout=10000)
        print("   [PASS] UI displayed quick contact form success message.")
        
        # Verify Database Write
        db_success, db_data = verify_db_record("verify-lead", quick_email)
        if db_success:
            print(f"   [PASS] Database verify: Quick Lead successfully inserted")
            print(f"          Name: '{db_data.get('contactName')}', Goals: '{db_data.get('goals')}'")
        else:
            print(f"   [FAIL] Database verify failed for quick contact form: {db_data.get('error')}")
            success = False

        # ----------------------------------------------------
        # SCENARIO 7: Contact Page - Full Consultation Form
        # ----------------------------------------------------
        print("\n--- Scenario 7: Contact Page Full Consultation Form E2E ---")
        await page.goto(f"{target_url}/contact")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        full_biz = f"E2E Business {timestamp}"
        full_name = f"E2E Contact {timestamp}"
        full_email = f"{test_prefix}-full@example.com"
        full_goals = f"Custom audio and viral strategy needed."
        print(f"-> Submitting full consultation form: {full_email}")
        
        await page.locator("#full-contact-form input[name='business-name']").fill(full_biz)
        await page.locator("#full-contact-form input[name='contact-name']").fill(full_name)
        await page.locator("#full-contact-form input[name='email']").fill(full_email)
        await page.locator("#full-contact-form select[name='business-type']").select_option("retail")
        
        # Check one of the services checkboxes
        await page.locator("#full-contact-form input[name='services'][value='Custom Jingles / Ad Music']").check()
        await page.locator("#full-contact-form textarea[name='goals']").fill(full_goals)
        await page.locator("#full-contact-form button[type='submit']").click()
        
        success_text_locator = page.locator("text=request for a free brand audit has been received")
        await success_text_locator.wait_for(state="visible", timeout=10000)
        print("   [PASS] UI displayed full consultation success message.")
        
        # Verify Database Write
        db_success, db_data = verify_db_record("verify-lead", full_email)
        if db_success:
            print(f"   [PASS] Database verify: Full Lead successfully inserted")
            print(f"          Business: '{db_data.get('businessName')}', Name: '{db_data.get('contactName')}', Services: '{db_data.get('services')}', Goals: '{db_data.get('goals')}'")
        else:
            print(f"   [FAIL] Database verify failed for full contact: {db_data.get('error')}")
            success = False

    except Exception as e:
        print(f"\n[FAIL] Exception encountered during test execution: {str(e)}")
        success = False
        import traceback
        traceback.print_exc()
        
    finally:
        # Perform DB Cleanup so we don't leave junk in the database
        cleanup_db()
        
        if context:
            await context.close()
        if browser:
            await browser.close()
        if playwright_session:
            await playwright_session.stop()
            
    return success

if __name__ == "__main__":
    test_result = asyncio.run(run_tests())
    print("\n==================================================")
    if test_result:
        print("SUCCESS: ALL INTEGRATION AND DATABASE E2E TESTS PASSED!")
        sys.exit(0)
    else:
        print("FAILURE: SOME INTEGRATION AND/OR DATABASE E2E TESTS FAILED.")
        sys.exit(1)
