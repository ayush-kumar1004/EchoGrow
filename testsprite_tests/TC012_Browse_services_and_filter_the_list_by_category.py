import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        pw = await async_api.async_playwright().start()
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )
        context = await browser.new_context()
        context.set_default_timeout(15000)
        page = await context.new_page()
        # -> navigate
        await page.goto("http://localhost:3000")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'Services' navigation link (interactive element [18]) to open the /services page and then inspect the page for category filters.
        # link "Services"
        elem = page.locator("xpath=/html/body/nav/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Services' navigation link (interactive element [18]) to navigate to /services, then inspect the resulting page for category filters.
        # link "Services"
        elem = page.locator("xpath=/html/body/nav/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # --> Test failed (AST guard fallback)
        raise AssertionError("Test failed during agent run: " + "Verification result: the category-filtering feature is not present on the /services page. Observed facts (all items verifiable from the current session): - Page visited: http://localhost:3000/services (Services & Solutions page). Service cards are visible in the viewport. - No category/filter UI found: searches for the text strings 'Category', 'Filter', and 'All' returned no matches on the page...")
        await asyncio.sleep(5)
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    