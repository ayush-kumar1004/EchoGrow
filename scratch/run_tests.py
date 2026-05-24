import subprocess
import sys
import os

tests = [
    "TC001_Submit_a_complete_business_inquiry.py",
    "TC009_Submit_a_portfolio_inquiry_from_the_portfolio_page.py",
    "TC012_Browse_services_and_filter_the_list_by_category.py",
    "TC014_View_portfolio_campaigns_and_filter_by_category.py",
    "TC027_Use_how_it_works_CTA_to_open_contact_destination.py"
]

print("==================================================")
print("            STARTING LOCAL PLAYWRIGHT TESTS       ")
print("==================================================")

success_count = 0
failed_tests = []

for test in tests:
    test_path = os.path.join("testsprite_tests", test)
    print(f"Running {test}...")
    result = subprocess.run([sys.executable, test_path], capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"[PASS] {test}\n")
        success_count += 1
    else:
        print(f"[FAIL] {test}")
        print("Error output:")
        print(result.stderr or result.stdout)
        print("-" * 50)
        failed_tests.append(test)

print("==================================================")
print(f"Summary: {success_count}/{len(tests)} tests passed.")
if failed_tests:
    print(f"Failed tests: {failed_tests}")
    sys.exit(1)
else:
    print("All verified tests passed successfully!")
    sys.exit(0)
