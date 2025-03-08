
from urllib.parse import urlparse

class SiteURL:
    def __init__(self, url):        
        parsed_url = urlparse(url)
        self.hostname = parsed_url.hostname


    def get_https(self) -> str:
        return f"https://{self.hostname}"
    
    def get_http(self) -> str:
        return f"http://{self.hostname}"

    
    