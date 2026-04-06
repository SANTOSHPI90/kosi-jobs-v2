import requests
from bs4 import BeautifulSoup
import json
import urllib3

# Suppress annoying SSL warnings (very common with .nic.in sites)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def scrape_govt_nic(dist):
    url = f"https://{dist}.nic.in/notice/recruitment/"
    jobs = []
    print(f"--> Checking Government portal for {dist.upper()}...")
    
    try:
        # verify=False is crucial for bypassing NIC website security blocks
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=15, verify=False)
        soup = BeautifulSoup(r.text, 'html.parser')
        table = soup.find('table')
        
        if table:
            rows = table.find_all('tr')[1:] # Skip header row
            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 3:
                    jobs.append({
                        "id": f"GOV-{dist}-{abs(hash(cols[0].text.strip())) % 10000}",
                        "title": cols[0].text.strip(),
                        "department": "District Administration",
                        "location": dist.capitalize(),
                        "sector": "Government",
                        "salary": "As per Govt Norms",
                        "lastDate": cols[2].text.strip(),
                        "eligibility": "Refer to official PDF on portal.",
                        "documents": ["Aadhar", "Marksheets", "Residential"],
                        "examDetails": "Merit/Written",
                        "officialLink": url
                    })
            print(f"    [OK] Found {len(jobs)} Govt jobs in {dist.capitalize()}.")
        else:
            print(f"    [INFO] No recruitment table found on {dist.capitalize()} website right now.")
            
    except Exception as e:
        print(f"    [ERROR] Failed to scrape {dist.capitalize()}: {e}")
        
    return jobs

def get_private_and_special_jobs():
    print("--> Loading Private Sector & Jeevika Jobs...")
    return [
        {
            "id": "PVT-ALSTOM-001",
            "title": "Industrial Quality Engineer",
            "department": "Alstom Madhepura",
            "location": "Madhepura",
            "sector": "Private",
            "salary": "₹4.5 - 8.0 LPA",
            "lastDate": "April 30, 2026",
            "eligibility": "B.E/B.Tech (Mech/Elec) with 3-7 years experience.",
            "documents": ["Resume", "Experience Letter", "Degree"],
            "examDetails": "Technical & HR Interview",
            "officialLink": "https://jobsearch.alstom.com/search/?q=Madhepura"
        },
        {
            "id": "GOV-JEEVIKA-2026",
            "title": "Office Assistant / IT Executive",
            "department": "Bihar Jeevika (BRLPS)",
            "location": "All Districts (Kosi)",
            "sector": "Government",
            "salary": "₹15,000 - ₹25,000",
            "lastDate": "Results/DV Phase",
            "eligibility": "Graduate / ITI / Diploma (As per 2025-26 drive).",
            "documents": ["CBT Scorecard", "ID Proof", "Certificates"],
            "examDetails": "Document Verification / Skill Test",
            "officialLink": "https://brlps.in/career"
        },
        {
            "id": "PVT-HEALTH-001",
            "title": "Staff Nurse / Medical Officer",
            "department": "Shiva Hospital / Medical College",
            "location": "Madhepura",
            "sector": "Private",
            "salary": "Negotiable",
            "lastDate": "Ongoing",
            "eligibility": "B.Sc Nursing / GNM / MBBS.",
            "documents": ["Registration", "Resume", "ID"],
            "examDetails": "Walk-in Interview",
            "officialLink": "https://shivahospital.in/healthcare-jobs-in-madhepura-bihar-india.html"
        }
    ]

def run_v2_scraper():
    all_jobs = []
    print("=== STARTING JOB SCRAPER ===")
    
    # 1. Scrape Government Jobs
    for d in ['madhepura', 'saharsa', 'supaul']:
        all_jobs.extend(scrape_govt_nic(d))
        
    # 2. Add Private/Special Jobs
    all_jobs.extend(get_private_and_special_jobs())
    
    # 3. Save to File
    try:
        with open('jobs.json', 'w', encoding='utf-8') as f:
            json.dump(all_jobs, f, indent=4)
        print(f"\n=== SUCCESS! {len(all_jobs)} total jobs saved to jobs.json ===")
    except Exception as e:
        print(f"\n=== CRITICAL ERROR saving file: {e} ===")

if __name__ == "__main__":
    run_v2_scraper()