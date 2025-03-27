
import requests


class Site_Status:

    def __init__(self):
        self.count_success = 0
        self.count_fail = 0
        self.count_ok = 0
        self.count_client_error = 0
        self.count_server_error = 0

    def update_count_success(self):
        self.count_success += 1

    def update_count_fail(self):
        self.count_fail += 1

    def update_count_ok(self):
        self.count_ok += 1

    def update_count_client_error(self):
        self.count_client_error += 1

    def update_count_server_error(self):
        self.count_server_error += 1

    def evaluate_response(self, response: requests.Response) -> tuple:

        status_code = response.status_code

        if status_code < 400:
            self.update_count_ok()
        elif status_code >= 400 and status_code < 500:
            self.update_count_client_error()
        elif status_code >= 500:
            self.update_count_server_error()
