

print(0)
import selenium
import sys
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

# details = json.loads(sys.argv[:])
# print(json.dumped(details))

def get_results(searchterm):
	print(4);
	browser.get("https://www.google.com")
	print("WHO ARE YOU??")
	search_box  = browser.find_element_by_xpath('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')
	search_box.send_keys(searchterm)
	search_box.submit()
	links = browser.find_elements_by_tag_name("a");


	results = []

	for link in links:
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
print(sys.argv[1:])
Tommy  = get_results(json.loads(sys.argv[:]));

print("Link to the desired Website: " + Tommy);
# link = browser.find_element_by_link_text(Tommy)
# link.click()
