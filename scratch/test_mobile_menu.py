import asyncio
import sys
from playwright.async_api import async_playwright

target_url = "http://localhost:3000"
if len(sys.argv) > 1:
    target_url = sys.argv[1]

target_url = target_url.rstrip("/")

print("==================================================")
print(f"       STARTING ECHOGROW MOBILE MENU TESTS       ")
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

        # ----------------------------------------------------
        # TEST 1: Desktop Viewport Checks
        # ----------------------------------------------------
        print("\n--- Test 1: Desktop Viewport (1280px width) ---")
        context = await browser.new_context(viewport={"width": 1280, "height": 800})
        page = await context.new_page()
        await page.goto(target_url)
        await page.wait_for_load_state("domcontentloaded")

        # Hamburger button should be hidden
        hamburger = page.locator("button[aria-label='Open mobile menu']")
        hamburger_visible = await hamburger.is_visible()
        if not hamburger_visible:
            print("   [PASS] Hamburger icon is hidden on desktop.")
        else:
            print("   [FAIL] Hamburger icon is visible on desktop.")
            success = False

        # Desktop navigation links should be visible
        # Let's target specifically the desktop navigation container
        desktop_link = page.locator("div.hidden.md\\:flex a:has-text('Services')").first
        desktop_link_visible = await desktop_link.is_visible()
        if desktop_link_visible:
            print("   [PASS] Desktop navigation links are visible.")
        else:
            print(f"   [FAIL] Desktop navigation links are hidden. Outer HTML: {await page.locator('div.hidden.md\\\\:flex').evaluate('el => el.outerHTML') if await page.locator('div.hidden.md\\\\:flex').count() > 0 else 'NOT FOUND'}")
            success = False

        await context.close()

        # ----------------------------------------------------
        # TEST 2: Mobile Viewport Checks
        # ----------------------------------------------------
        print("\n--- Test 2: Mobile Viewport (412px width) ---")
        context = await browser.new_context(viewport={"width": 412, "height": 915})
        page = await context.new_page()
        await page.goto(target_url)
        await page.wait_for_load_state("domcontentloaded")

        # Desktop navigation link should be hidden
        desktop_link = page.locator("div.hidden.md\\:flex a:has-text('Services')").first
        desktop_link_count = await page.locator("div.hidden.md\\:flex").count()
        desktop_link_visible = False
        if desktop_link_count > 0:
            desktop_link_visible = await desktop_link.is_visible()
        
        if not desktop_link_visible:
            print("   [PASS] Desktop navigation links are hidden on mobile.")
        else:
            print(f"   [FAIL] Desktop navigation links are visible on mobile. Outer HTML: {await desktop_link.evaluate('el => el.outerHTML')}")
            success = False

        # Hamburger button should be visible
        hamburger = page.locator("button[aria-label='Open mobile menu']")
        hamburger_visible = await hamburger.is_visible()
        if hamburger_visible:
            print("   [PASS] Hamburger icon is visible on mobile.")
        else:
            print("   [FAIL] Hamburger icon is hidden on mobile.")
            success = False

        # Click Hamburger button to open mobile menu
        print("   Clicking Hamburger icon...")
        await hamburger.click()
        await page.wait_for_timeout(500) # Wait for slide-in animation

        # Verify drawer has opened (check if dialog is visible)
        dialog = page.locator("div[role='dialog']")
        dialog_visible = await dialog.is_visible()
        dialog_html = await dialog.evaluate("el => el.outerHTML") if await dialog.count() > 0 else 'NOT FOUND'
        print(f"   Dialog Outer HTML: {dialog_html}")
        if dialog_visible:
            print("   [PASS] Mobile menu drawer panel opened successfully.")
        else:
            print("   [FAIL] Mobile menu drawer failed to open.")
            success = False
            print("   [FAIL] Mobile menu drawer failed to open.")
            success = False

        # Verify scroll is locked on body
        overflow_style = await page.evaluate("document.body.style.overflow")
        print(f"   Body Overflow Style: '{overflow_style}'")
        if overflow_style == "hidden":
            print("   [PASS] Body scroll locked successfully.")
        else:
            print("   [FAIL] Body scroll lock not active.")
            success = False

        # Verify drawer navigation links
        print("   Checking drawer navigation links...")
        mobile_links = ["Services", "Portfolio / Work", "Pricing", "AI Tools", "How It Works", "About", "Contact"]
        for title in mobile_links:
            link_locator = dialog.locator(f"a:has-text('{title}')").first
            is_link_visible = await link_locator.is_visible()
            if is_link_visible:
                print(f"   [PASS] Drawer contains link: '{title}'.")
            else:
                print(f"   [FAIL] Drawer link missing: '{title}'.")
                success = False

        # Verify CTA button
        trial_cta = dialog.locator("a:has-text('Try AI Script Generator Free')").first
        trial_cta_visible = await trial_cta.is_visible()
        if trial_cta_visible:
            print("   [PASS] Secondary CTA button is visible inside drawer.")
        else:
            print("   [FAIL] Secondary CTA button is missing inside drawer.")
            success = False

        # ----------------------------------------------------
        # TEST 3: Close via ESC Key
        # ----------------------------------------------------
        print("\n--- Test 3: Close menu using ESC key ---")
        print("   Pressing Escape key...")
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(500) # Wait for slide-out animation
        
        # Verify drawer closed and scroll lock released
        dialog_visible = await dialog.is_visible()
        overflow_style = await page.evaluate("document.body.style.overflow")
        dialog_html = await dialog.evaluate("el => el.outerHTML") if await dialog.count() > 0 else 'NOT FOUND'
        print(f"   [DEBUG ESC] dialog_visible={dialog_visible}, overflow_style='{overflow_style}', outerHTML: {dialog_html}")
        if not dialog_visible and overflow_style == "":
            print("   [PASS] Drawer closed and body scroll unlocked successfully via ESC.")
        else:
            print("   [FAIL] Drawer failed to close or body scroll stayed locked.")
            success = False

        # ----------------------------------------------------
        # TEST 4: Close via Overlay Backdrop Click
        # ----------------------------------------------------
        print("\n--- Test 4: Close menu using Backdrop click ---")
        print("   Re-opening mobile menu...")
        await hamburger.click()
        await page.wait_for_timeout(500)

        print("   Clicking overlay backdrop...")
        backdrop = page.locator("div[aria-hidden='true']")
        await backdrop.click(force=True)
        await page.wait_for_timeout(500)

        # Verify drawer closed
        dialog_visible = await dialog.is_visible()
        overflow_style = await page.evaluate("document.body.style.overflow")
        dialog_html = await dialog.evaluate("el => el.outerHTML") if await dialog.count() > 0 else 'NOT FOUND'
        print(f"   [DEBUG BACKDROP] dialog_visible={dialog_visible}, overflow_style='{overflow_style}', outerHTML: {dialog_html}")
        if not dialog_visible and overflow_style == "":
            print("   [PASS] Drawer closed and body scroll unlocked successfully via Backdrop click.")
        else:
            print("   [FAIL] Drawer failed to close via backdrop click.")
            success = False

        # ----------------------------------------------------
        # TEST 5: Click Link and Navigate
        # ----------------------------------------------------
        print("\n--- Test 5: Click link inside menu to navigate ---")
        print("   Re-opening mobile menu...")
        await hamburger.click()
        await page.wait_for_timeout(1000) # Wait for slide-in animation to fully settle

        print("   Locating 'AI Tools' link inside drawer...")
        tools_link = dialog.locator("a[href='/tools']").first
        print(f"   Target Link Outer HTML: {await tools_link.evaluate('el => el.outerHTML')}")
        
        print("   Clicking 'AI Tools' link...")
        await tools_link.click()
        await page.wait_for_timeout(1000) # Wait for navigation and state updates
        await page.wait_for_load_state("networkidle")

        # Verify we navigated to /tools
        current_url = page.url
        print(f"   Current URL after redirect: {current_url}")
        if "/tools" in current_url:
            print("   [PASS] Redirection to /tools completed successfully.")
        else:
            print("   [FAIL] Navigation failed to redirect to /tools.")
            success = False

        # Verify drawer is closed on new page
        dialog_visible = await dialog.is_visible()
        if not dialog_visible:
            print("   [PASS] Mobile menu drawer is closed on the redirected page.")
        else:
            print("   [FAIL] Mobile menu drawer remained open after redirect.")
            success = False

    except Exception as e:
        print(f"\n[FAIL] Exception encountered during test execution: {str(e)}")
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
        print("SUCCESS: ALL MOBILE MENU CHECKS PASSED!")
        sys.exit(0)
    else:
        print("FAILURE: SOME MOBILE MENU CHECKS FAILED.")
        sys.exit(1)
