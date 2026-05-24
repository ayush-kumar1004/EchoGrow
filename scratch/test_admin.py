import asyncio
import sys
import os
import time
import subprocess
import json
from playwright.async_api import async_playwright

# Setup target URL from arguments or default to localhost
target_url = "http://localhost:3000"
if len(sys.argv) > 1:
    target_url = sys.argv[1]

# Normalize target URL
target_url = target_url.rstrip("/")

print("==================================================")
print(f"       STARTING ADMIN PORTAL E2E TESTS           ")
print(f"   Target URL: {target_url}                      ")
print("==================================================")

timestamp = int(time.time())
test_prefix = f"admin-e2e-{timestamp}"
test_email_lead = f"{test_prefix}-lead@example.com"
test_email_sub = f"{test_prefix}-sub@example.com"

admin_user = os.environ.get("ADMIN_USERNAME", "admin")
admin_pass = os.environ.get("ADMIN_PASSWORD", "echogrow2026")

# Helper to verify DB records using node utility
def verify_db_record(action, email):
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
        context.set_default_timeout(15000) # 15 seconds timeout
        page = await context.new_page()

        # ----------------------------------------------------
        # TEST 1: Unauthenticated access to dashboard should redirect
        # ----------------------------------------------------
        print("\n--- Test 1: Redirect Unauthenticated User ---")
        dashboard_url = f"{target_url}/admin/dashboard"
        print(f"-> Navigating to {dashboard_url}...")
        await page.goto(dashboard_url)
        await page.wait_for_timeout(1000)
        
        current_url = page.url
        print(f"   Current URL: {current_url}")
        if "/login" in current_url:
            print("   [PASS] Unauthenticated access redirected to /login.")
        else:
            print("   [FAIL] Did not redirect to /login.")
            success = False

        # ----------------------------------------------------
        # TEST 2: Login failure with wrong credentials
        # ----------------------------------------------------
        print("\n--- Test 2: Login with Wrong Credentials ---")
        await page.goto(f"{target_url}/login")
        await page.locator("#username").fill("invalid_user")
        await page.locator("#password").fill("wrong_password")
        await page.locator("button[type='submit']").click()
        
        # Expect error message
        error_msg_locator = page.locator("text=Invalid username or password")
        await error_msg_locator.wait_for(state="visible", timeout=5000)
        print("   [PASS] Received 'Invalid username or password' alert.")

        # ----------------------------------------------------
        # TEST 3: Create Test Lead and Subscriber via UI
        # ----------------------------------------------------
        print("\n--- Test 3: Insert Test Lead & Subscriber via Public UI ---")
        # Go to contact page
        await page.goto(f"{target_url}/contact")
        await page.locator("#full-contact-form input[name='business-name']").fill(f"Admin E2E Biz {timestamp}")
        await page.locator("#full-contact-form input[name='contact-name']").fill(f"Admin E2E Contact {timestamp}")
        await page.locator("#full-contact-form input[name='email']").fill(test_email_lead)
        await page.locator("#full-contact-form select[name='business-type']").select_option("retail")
        await page.locator("#full-contact-form input[name='services'][value='Custom Jingles / Ad Music']").check()
        await page.locator("#full-contact-form textarea[name='goals']").fill(f"Verify dashboard updates. Pref: {test_prefix}")
        await page.locator("#full-contact-form button[type='submit']").click()
        
        # Wait for confirmation
        await page.locator("text=request for a free brand audit has been received").wait_for(state="visible", timeout=10000)
        print(f"   [PASS] Lead successfully submitted: {test_email_lead}")

        # Go to home page and subscribe
        await page.goto(f"{target_url}/")
        await page.locator("#subscriber-form input[name='email']").fill(test_email_sub)
        await page.locator("#subscriber-form button[type='submit']").click()
        await page.locator("text=requested a free audit review").wait_for(state="visible", timeout=10000)
        print(f"   [PASS] Subscriber successfully submitted: {test_email_sub}")

        # ----------------------------------------------------
        # TEST 4: Successful Login
        # ----------------------------------------------------
        print("\n--- Test 4: Admin Success Login ---")
        await page.goto(f"{target_url}/login")
        await page.locator("#username").fill(admin_user)
        await page.locator("#password").fill(admin_pass)
        await page.locator("button[type='submit']").click()
        
        # Verify redirect to dashboard
        await page.wait_for_url(f"{target_url}/admin/dashboard", timeout=10000)
        print("   [PASS] Successfully logged in and redirected to dashboard.")

        # ----------------------------------------------------
        # TEST 5: Verify Lead Rendered and Status Mutation
        # ----------------------------------------------------
        print("\n--- Test 5: Verify Lead Rendered and Mutate Status ---")
        # The lead should be listed. Let's find it.
        lead_contact_name_text = f"Admin E2E Contact {timestamp}"
        await page.locator(f"text={lead_contact_name_text}").wait_for(state="visible", timeout=5000)
        print("   [PASS] Found submitted lead contact name in the dashboard.")

        # Find status dropdown for our specific lead article
        # We can target the select box within the same card / article
        lead_article = page.locator("article", has_text=lead_contact_name_text)
        status_select = lead_article.locator("select")
        
        # Current status should be "New"
        current_status = await status_select.evaluate("el => el.value")
        print(f"   Current status in UI: {current_status}")
        if current_status == "New":
            print("   [PASS] Status is initially 'New'")
        else:
            print("   [FAIL] Status is not initially 'New'")
            success = False

        # Change status to "In Progress"
        print("   Changing status to 'In Progress'...")
        await status_select.select_option("In Progress")
        await page.wait_for_timeout(2000) # Wait for network action / state transition to process

        # Verify DB update
        db_success, db_data = verify_db_record("verify-lead", test_email_lead)
        if db_success:
            print(f"   [Verify DB] Lead status in DB: {db_data.get('status')}")
            if db_data.get('status') == "In Progress":
                print("   [PASS] Database successfully updated to 'In Progress'.")
            else:
                print("   [FAIL] Database status update failed.")
                success = False
        else:
            print("   [FAIL] Database record not retrieved for verification.")
            success = False

        # ----------------------------------------------------
        # TEST 6: Edit Admin Notes
        # ----------------------------------------------------
        print("\n--- Test 6: Edit Admin Notes ---")
        notes_box = lead_article.locator("text=Click to add admin notes...")
        await notes_box.click()
        
        # Fill in text area
        notes_textarea = lead_article.locator("textarea")
        test_note = f"Follow-up call on next Monday. Prefix: {test_prefix}"
        await notes_textarea.fill(test_note)
        
        # Click Save
        await lead_article.locator("button:has-text('Save')").click()
        await page.wait_for_timeout(2000)

        # Verify notes updated in DB
        db_success, db_data = verify_db_record("verify-lead", test_email_lead)
        if db_success:
            print(f"   [Verify DB] Lead notes in DB: '{db_data.get('notes')}'")
            if db_data.get('notes') == test_note:
                print("   [PASS] Database successfully updated with lead notes.")
            else:
                print("   [FAIL] Database notes update failed.")
                success = False
        else:
            print("   [FAIL] Database record not retrieved for verification.")
            success = False

        # ----------------------------------------------------
        # TEST 7: Newsletter Tab and Subscriber List
        # ----------------------------------------------------
        print("\n--- Test 7: Verify Subscriber in Newsletter Tab ---")
        # Click on Newsletter Subscribers tab
        await page.locator("button:has-text('Newsletter Subscribers')").click()
        await page.wait_for_timeout(1000)
        
        # Check if email is in the list
        sub_email_row = page.locator("td", has_text=test_email_sub)
        await sub_email_row.wait_for(state="visible", timeout=5000)
        print("   [PASS] Verified subscriber email is listed in the subscribers tab.")

        # ----------------------------------------------------
        # TEST 8: Delete Inquiry
        # ----------------------------------------------------
        print("\n--- Test 8: Delete Lead Inquiry ---")
        # Switch back to leads tab
        await page.locator("button:has-text('Contact Leads')").click()
        await page.wait_for_timeout(1000)
        
        # Find Delete Inquiry button for our lead
        # Setup confirm dialog listener to automatically accept the confirmation
        page.once("dialog", lambda dialog: dialog.accept())
        await lead_article.locator("button:has-text('Delete Inquiry')").click()
        await page.wait_for_timeout(2000)
        
        # Verify it's gone from UI
        lead_visible = await page.locator(f"text={lead_contact_name_text}").is_visible()
        if not lead_visible:
            print("   [PASS] Lead removed from dashboard UI.")
        else:
            print("   [FAIL] Lead still visible in dashboard UI after deletion.")
            success = False
            
        # Verify it's gone from DB
        db_success, db_data = verify_db_record("verify-lead", test_email_lead)
        if not db_success or db_data.get("found") is False:
            print("   [PASS] Lead successfully deleted from DB.")
        else:
            print(f"   [FAIL] Lead still present in DB (ID: {db_data.get('id')}).")
            success = False

        # ----------------------------------------------------
        # TEST 9: Admin Logout
        # ----------------------------------------------------
        print("\n--- Test 9: Admin Logout ---")
        # Click header logout button or navbar logout button
        # There's a logout button in the header card, let's use it
        await page.locator("header button:has-text('Logout')").click()
        await page.wait_for_url(f"{target_url}/login", timeout=10000)
        print("   [PASS] Successfully logged out and redirected to login page.")
        
        # Try to go to dashboard again
        await page.goto(dashboard_url)
        await page.wait_for_timeout(1000)
        if "/login" in page.url:
            print("   [PASS] Confirmed that dashboard access is blocked after logout.")
        else:
            print("   [FAIL] Access to dashboard was not blocked after logout.")
            success = False

    except Exception as e:
        print(f"\n[FAIL] Exception encountered during test execution: {str(e)}")
        success = False
        import traceback
        traceback.print_exc()
        
    finally:
        # Perform DB Cleanup
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
        print("SUCCESS: ALL ADMIN PORTAL E2E TESTS PASSED!")
        sys.exit(0)
    else:
        print("FAILURE: SOME ADMIN PORTAL E2E TESTS FAILED.")
        sys.exit(1)
