

print(0)
import getopt
import selenium
import sys

#print(sys.stdin.readLines())
import json
import requests


print(1)
from urllib.parse import urlparse

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
print(2)
options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
print(3)
browser = webdriver.Chrome(ChromeDriverManager().install() ,chrome_options = options)
print("Yay baby!! ");
print(sys.argv);

print("Done")
def get_results(searchterm):
	print(4);
	browser.get("https://www.google.com")
	print("WHO ARE YOU??")
	search_box  = browser.find_element_by_xpath('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')
	print("heyy")

	searchterm = searchterm.pop()
	search_box.send_keys(searchterm)
	print(type(searchterm))
	search_box.submit()
	print("A1");
	links = browser.find_elements_by_tag_name("a");
	print("A2")

	results = []

	for link in links:
		print("A3")
		href = link.get_attribute("href")
		parsed = urlparse(href)
	#	print(href)
	#	print(parsed)
		CritA = parsed.netloc
	#	print(type(CritA))

		if (isinstance(CritA, type("ABD"))):
		#	print("CRITA: " + CritA)
			if ("gov" in CritA):
				CritB  = parsed.path
				if ("pdf" in CritB):
					aref = href
				#	print("Aref: "  + aref);
					return aref;
					break;
		else:
			if ("gov" in CritA.decode()):
				CritB  = parsed.path
				if ("pdf" in CritB):
					aref = href
					return aref;
					break;

	browser.close()
	return

print("hIIII");
for line in sys.stdin:
	if 'Exit' == line.rstrip():
		break
	print(f'Processing Message from sys.stdin *****{line}*****')
	print(get_results({line}))
	print("Done");
print(sys.argv);
Tommy  = get_results(sys.argv[1]);
sys.stdout.flush();
print("Link to the desired Website: " + Tommy);
sys.stdout.flush();
# link = browser.find_element_by_link_text(Tommy)
# link.click()
