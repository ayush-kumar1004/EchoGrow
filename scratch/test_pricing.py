import asyncio
import sys
from playwright.async_api import async_playwright

target_url = "http://localhost:3000"
if len(sys.argv) > 1:
    target_url = sys.argv[1]

target_url = target_url.rstrip("/")

print("==================================================")
print(f"       STARTING ECHOGROW PRICING PAGE TESTS      ")
print(f"   Target URL: {target_url}                      ")
print("==================================================")

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
        context.set_default_timeout(15000)
        page = await context.new_page()

        # ----------------------------------------------------
        # TEST 1: Load Page and Verify Hero Copy
        # ----------------------------------------------------
        print("\n--- Test 1: Load pricing page and verify Hero Copy ---")
        pricing_url = f"{target_url}/pricing"
        print(f"-> Navigating to {pricing_url}...")
        await page.goto(pricing_url)
        await page.wait_for_load_state("domcontentloaded")

        # Expect heading
        h1_text = await page.locator("h1").inner_text()
        print(f"   Hero Heading: '{h1_text}'")
        if "Affordable Creative Campaigns That People Remember" in h1_text:
            print("   [PASS] Hero heading matches repositioned copy.")
        else:
            print("   [FAIL] Hero heading mismatch.")
            success = False

        # ----------------------------------------------------
        # TEST 2: Verify Startup Pricing Trust Strip
        # ----------------------------------------------------
        print("\n--- Test 2: Verify Startup Pricing Trust Strip ---")
        strip_title = await page.locator("h3:has-text('Built for Startups')").inner_text()
        print(f"   Trust Strip: '{strip_title}'")
        if "Built for Startups & Local Businesses" in strip_title:
            print("   [PASS] Startup trust strip loaded correctly.")
        else:
            print("   [FAIL] Startup trust strip heading mismatch.")
            success = False

        # ----------------------------------------------------
        # TEST 3: Verify Packages Structure & Deliverables
        # ----------------------------------------------------
        print("\n--- Test 3: Verify Pricing Packages and 'What You Get' ---")
        package_titles = ["Echo Starter", "Brand Memory Pack", "Viral Product Launch", "Custom Growth Partner"]
        for title in package_titles:
            locator = page.locator(f"h3:has-text('{title}')")
            count = await locator.count()
            if count > 0:
                print(f"   [PASS] Package '{title}' rendered successfully.")
            else:
                print(f"   [FAIL] Package '{title}' not found.")
                success = False

        # Verify What You Get header
        what_you_get_locator = page.locator("div:has-text('What You Get')")
        what_you_get_count = await what_you_get_locator.count()
        print(f"   'What You Get' section count in cards: {what_you_get_count}")
        if what_you_get_count >= 4:
            print("   [PASS] 'What You Get' deliverables list is active on all cards.")
        else:
            print("   [FAIL] 'What You Get' header count is lower than expected.")
            success = False

        # Verify Jingle Starter / Echo Starter starting price
        starter_price = await page.locator("article:has-text('Echo Starter')").locator("div:has-text('₹1,499')").first.inner_text()
        print(f"   Echo Starter Price: {starter_price.replace('₹', 'Rs.')}")
        if "1,499" in starter_price:
            print("   [PASS] Starting price Rs. 1,499 is correct.")
        else:
            print("   [FAIL] Starting price mismatch.")
            success = False

        # Verify Custom Price styling
        custom_package_btn = page.locator("article:has-text('Custom Growth Partner')").locator("a:has-text('Request Custom Quote')")
        btn_class = await custom_package_btn.get_attribute("class")
        print(f"   Custom Quote Button Class: '{btn_class}'")
        if "border" in btn_class and "text-gray-900" in btn_class:
            print("   [PASS] Custom price button renders as outline style.")
        else:
            print("   [FAIL] Custom price button is not styled as outline.")
            success = False

        # ----------------------------------------------------
        # TEST 4: Verify Comparison Table
        # ----------------------------------------------------
        print("\n--- Test 4: Verify Comparison Table ---")
        table_header = page.locator("h2:has-text('Compare Packages')")
        await table_header.wait_for(state="visible")
        table_visible = await page.locator("table").is_visible()
        if table_visible:
            print("   [PASS] Comparison table renders successfully.")
        else:
            print("   [FAIL] Comparison table not visible.")
            success = False

        # ----------------------------------------------------
        # TEST 5: Verify "See What We Create" Showcase Section
        # ----------------------------------------------------
        print("\n--- Test 5: Verify Sample Output Showcase ---")
        showcase_header = page.locator("h2:has-text('See What We Create')")
        await showcase_header.wait_for(state="visible")
        
        gym_goal = await page.locator("span:has-text('Goal: Increase memberships')").is_visible()
        masala_goal = await page.locator("span:has-text('Goal: Brand Recall')").is_visible()
        
        if gym_goal and masala_goal:
            print("   [PASS] Gym and Masala sample showcases loaded successfully.")
        else:
            print("   [FAIL] Sample showcase cards are missing details.")
            success = False

        # ----------------------------------------------------
        # TEST 6: Verify Links redirect to /tools
        # ----------------------------------------------------
        print("\n--- Test 6: Verify Free Tools Redirect Links ---")
        script_gen_btn = page.locator("a:has-text('Generate Script')").first
        href = await script_gen_btn.get_attribute("href")
        print(f"   Tools Generator Link Href: '{href}'")
        if href == "/tools":
            print("   [PASS] Redirect buttons route correctly to /tools.")
        else:
            print("   [FAIL] Redirect button link mismatch.")
            success = False

    except Exception as e:
        error_msg = str(e).replace('\u20b9', 'Rs.')
        print(f"\n[FAIL] Exception encountered during test execution: {error_msg}")
        success = False
        import traceback
        traceback.print_exc()
        
    finally:
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
        print("SUCCESS: ALL PRICING PAGE CHECKS PASSED!")
        sys.exit(0)
    else:
        print("FAILURE: SOME PRICING PAGE CHECKS FAILED.")
        sys.exit(1)
