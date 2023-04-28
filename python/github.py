import requests

url = "https://api.github.com/repos/{owner}/{repo}/languages"
response = requests.get(url.format(owner="DayZmooN", repo="your-repo"),
                        headers={"Accept": "application/vnd.github+json"})

total_lines = sum(response.json().values())
for lang, lines in response.json().items():
    percentage = lines / total_lines * 100
    print(f"{lang}: {percentage:.2f}%")
