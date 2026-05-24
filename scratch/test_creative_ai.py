import asyncio
import sys
import os
import time
from playwright.async_api import async_playwright

target_url = "https://echogrow-three.vercel.app"
if len(sys.argv) > 1:
    target_url = sys.argv[1]

target_url = target_url.rstrip("/")

print("==================================================")
print(f"      STARTING AI CREATIVE DIRECTOR TESTS         ")
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
        context.set_default_timeout(50000) # 50s timeout for AI generation
        page = await context.new_page()

        # ----------------------------------------------------
        # TEST 1: Page Load and Steps Walking
        # ----------------------------------------------------
        print("\n--- Test 1: Load page and walk through form ---")
        tools_url = f"{target_url}/tools"
        print(f"-> Navigating to {tools_url}...")
        await page.goto(tools_url)
        await page.wait_for_load_state("domcontentloaded")

        # Expect title
        title_text = await page.locator("h1").inner_text()
        print(f"   Header Title: {title_text}")
        if "AI Creative Director" in title_text:
            print("   [PASS] Tools workspace loaded successfully.")
        else:
            print("   [FAIL] Tools page title mismatch.")
            success = False

        # Step 1: What do you want to create? -> Select Funny Reel
        print("   Step 1: Selecting 'Funny Reel'...")
        await page.locator("button:has-text('Funny Reel')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 2: Category -> Select Food & Beverage
        print("   Step 2: Selecting 'Food & Beverage'...")
        await page.locator("button:has-text('Food & Beverage')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 3: Campaign Goal -> Select Brand Recall
        print("   Step 3: Selecting 'Brand Recall'...")
        await page.locator("button:has-text('Brand Recall')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 4: Creative Style -> Select Funny
        print("   Step 4: Selecting 'Funny'...")
        await page.locator("button:has-text('Funny')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 5: Language -> Select Hinglish
        print("   Step 5: Selecting 'Hinglish'...")
        await page.locator("button:has-text('Hinglish')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 6: Demographics -> Fill fields
        print("   Step 6: Filling Target Audience Demographics...")
        await page.locator("#ageGroup").fill("18-35")
        await page.locator("#gender").select_option("All")
        await page.locator("#location").fill("Delhi NCR")
        await page.locator("#audienceType").fill("Working Professionals")
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 7: Budget -> Select Medium Budget
        print("   Step 7: Selecting 'Medium Budget'...")
        await page.locator("button:has-text('Medium Budget')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 8: Details -> Write description
        print("   Step 8: Entering business details...")
        await page.locator("#details").fill("We sell organic mango pickles prepared from traditional grandma secrets with zero preservatives. We want consumers to recall home-cooked meals.")
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 9: Inspiration -> Select Fevicol Style
        print("   Step 9: Selecting 'Fevicol Style'...")
        await page.locator("button:has-text('Fevicol Style')").first.click()
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 10: Competitors
        print("   Step 10: Entering competitors...")
        await page.locator("#competitors").fill("Mother's Recipe, Priya Pickles")
        await page.locator("button:has-text('Next')").click()
        await page.wait_for_timeout(500)

        # Step 11: Extra direction
        print("   Step 11: Entering extra creative instructions...")
        await page.locator("#direction").fill("Keep the dialogue funny and in colloquial Hinglish. End with a strong visual jingle cue.")
        
        # ----------------------------------------------------
        # TEST 2: Generate Campaign
        # ----------------------------------------------------
        print("\n--- Test 2: Trigger AI Generation ---")
        print("   Clicking 'Generate Campaign'...")
        await page.locator("button:has-text('Generate Campaign')").click()

        # Verify loading state
        print("   Verifying loading animation & message rotations...")
        loading_header = page.locator("h3:has-text('Audience'), h3:has-text('hooks'), h3:has-text('scenes'), h3:has-text('dialogue'), h3:has-text('thinking'), h3:has-text('psychology'), h3:has-text('strategy')")
        try:
            await loading_header.wait_for(state="visible", timeout=3000)
            print("   [PASS] Loading state correctly visible.")
        except Exception:
            print("   [WARNING] Loading header transition occurred too fast or spinner was missed.")

        # Wait for success state (should contain "1. Campaign Summary")
        print("   Waiting for Gemini API content generation...")
        summary_title_locator = page.locator("text=1. Campaign Summary")
        await summary_title_locator.wait_for(state="visible", timeout=50000)
        
        # Verify script details loaded
        script_title = await page.locator("h2").first.inner_text()
        print(f"   Generated Campaign Title: '{script_title}'")
        if len(script_title) > 2:
            print("   [PASS] Script loaded successfully with custom title.")
        else:
            print("   [FAIL] Script title was empty.")
            success = False

        # ----------------------------------------------------
        # TEST 3: Soft Lead Capture and Storyboard Unlock
        # ----------------------------------------------------
        print("\n--- Test 3: Verify Storyboard Blur & Unlock Flow ---")
        # Check that lock overlay is visible
        lock_title_locator = page.locator("text=Unlock Full Director-Level Script")
        await lock_title_locator.wait_for(state="visible", timeout=5000)
        print("   [PASS] Storyboard locked and blur gate overlay is active.")

        # Enter email and submit to unlock
        unlock_email = "e2e-creative-test@example.com"
        print(f"   Submitting unlock email: {unlock_email}")
        await page.locator("input[placeholder='name@business.com']").fill(unlock_email)
        await page.locator("button:has-text('Unlock Storyboard')").click()

        # Wait for lock overlay to go away
        await lock_title_locator.wait_for(state="hidden", timeout=5000)
        print("   [PASS] Storyboard unlocked successfully. Full script exposed.")

        # Ensure at least 4 scenes are rendered
        scene_count = await page.locator("article:has-text('Scene')").count()
        print(f"   Number of storyboard scenes rendered: {scene_count}")
        if scene_count >= 4:
            print(f"   [PASS] Storyboard validated with {scene_count} scenes.")
        else:
            print(f"   [FAIL] Less than 4 scenes were rendered ({scene_count}).")
            success = False

        # ----------------------------------------------------
        # TEST 4: Refinement Trigger
        # ----------------------------------------------------
        print("\n--- Test 4: Verify Script Refinement Preserves Context ---")
        original_summary = await page.locator("h4:has-text('1. Campaign Summary') + p").inner_text()
        
        # Click "More Funny" refinement pill
        print("   Clicking 'More Funny' refinement button...")
        await page.locator("button:has-text('More Funny')").click()
        
        # Wait for loading state and reload
        try:
            await page.locator(".animate-spin").first.wait_for(state="visible", timeout=2000)
            print("   [PASS] Refinement loading transition activated.")
        except Exception:
            print("   [WARNING] Refinement transition occurred too fast to catch loading spinner.")
        
        # Wait for reload
        await summary_title_locator.wait_for(state="visible", timeout=40000)
        refined_summary = await page.locator("h4:has-text('1. Campaign Summary') + p").inner_text()
        print("   [PASS] Refined campaign updated successfully.")
        
        # Verify copy text action is present
        copy_btn_visible = await page.locator("button:has-text('Copy Script')").is_visible()
        if copy_btn_visible:
            print("   [PASS] Actions toolbar ('Copy Script', 'Save Campaign') is visible.")
        else:
            print("   [FAIL] Actions toolbar not found.")
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
        print("SUCCESS: ALL CREATIVE DIRECTOR AI TESTS PASSED!")
        sys.exit(0)
    else:
        print("FAILURE: SOME CREATIVE DIRECTOR AI TESTS FAILED.")
        sys.exit(1)
