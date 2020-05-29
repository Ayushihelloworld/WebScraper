import selenium
from urllib.parse import urlparse

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')

browser = webdriver.Chrome(ChromeDriverManager().install() ,chrome_options = options)

def get_results(searchterm):
	browser.get("https://www.google.com")

	search_box  = browser.find_element_by_xpath('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')
	search_box.send_keys(searchterm)
	search_box.submit()
	links = browser.find_elements_by_tag_name("a");
  
	
	results = []

	for link in links:
		href = link.get_attribute("href")
		parsed = urlparse(href)
	#	print(href)
		print(parsed)
		CritA = parsed.netloc
		print(type(CritA))
		
		if (isinstance(CritA, type("ABD"))):
			print("CRITA: " + CritA)	
			if ("gov" in CritA):
				CritB  = parsed.path
				if ("pdf" in CritB):
					aref = href
					print("Aref: "  + aref);
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

Tommy  = get_results("Constitution of India pdf")
print("Tommy " + Tommy);