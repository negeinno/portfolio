export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'Business Intelligence' | 'Python & EDA' | 'SQL & Data Modeling' | 'AI Analytics';
  timeline: string;
  role: string;
  tools: string[];
  metrics: { label: string; value: string; change?: string; positive?: boolean }[];
  summary: string;
  problem: string;
  solution: string;
  methodology: {
    step: string;
    title: string;
    description: string;
  }[];
  codeSnippets: {
    language: string;
    title: string;
    code: string;
  }[];
  visualHighlights: {
    title: string;
    description: string;
    type: 'bar' | 'donut' | 'line' | 'kpi-grid';
  };
  keyTakeaways: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

export const PERSONAL_INFO = {
  name: "Anmol Kumar",
  title: "Data Analyst & Business Intelligence Specialist",
  tagline: "Bridging the gap between raw datasets and executive decisions through SQL, Python, Power BI, and AI-augmented analytics.",
  location: "Bengaluru, Karnataka, India",
  phone: "+91 95084 12334",
  email: "anmol.krhjp@gmail.com",
  linkedin: "https://linkedin.com/in/anmol-kumar4",
  github: "https://github.com/negeinno",
  resumeUrl: "/Anmol_Kumar_Resume.pdf",
  bio: "Computer Science graduate with a strong foundation in SQL, Python, Microsoft Excel, and data analysis. Passionate about transforming raw data into meaningful business insights through systematic data cleaning, exploratory data analysis (EDA), interactive visualization, and automated reporting. Skilled in AI-assisted analytics and business intelligence, with hands-on experience in relational databases and KPI modeling.",
  philosophy: "Data without empathy and context is just rows and columns. My mission is to translate complex numerical distributions into intuitive, human-centered narratives that drive measurable business outcomes.",
  status: "Open to Entry-Level Data Analyst & BI Roles",
};

export const CORE_KPIS = [
  { label: "Data Pipelines & Models", value: "15+", subtext: "Cleaned, transformed & structured" },
  { label: "Production BI Dashboards", value: "6+", subtext: "Interactive executive scorecards" },
  { label: "SQL Queries Engineered", value: "500+", subtext: "Complex CTEs, window functions & views" },
  { label: "Data Cleaning Accuracy", value: "99.8%", subtext: "Standardized & validated datasets" },
];

export const TECHNICAL_SKILLS = [
  {
    category: "Programming & Querying",
    icon: "code",
    skills: [
      { name: "SQL (MySQL, PostgreSQL)", level: 92, tag: "Primary" },
      { name: "Python", level: 88, tag: "Primary" },
      { name: "Pandas & NumPy", level: 90, tag: "Core" },
      { name: "Matplotlib & Seaborn", level: 85, tag: "Visualization" },
    ],
    description: "Complex aggregations, subqueries, recursive CTEs, indexing, window functions, and programmatic data munging."
  },
  {
    category: "Business Intelligence & BI Tools",
    icon: "bar-chart-2",
    skills: [
      { name: "Power BI Desktop & Service", level: 94, tag: "Primary" },
      { name: "DAX (Data Analysis Expressions)", level: 88, tag: "Advanced" },
      { name: "Power Query (M Language)", level: 86, tag: "ETL" },
      { name: "Data Modeling & Star Schema", level: 90, tag: "Architecture" },
    ],
    description: "Interactive report design, dynamic drill-down hierarchies, KPI scorecards, custom time intelligence calculations."
  },
  {
    category: "Spreadsheets & Analytics",
    icon: "table",
    skills: [
      { name: "Microsoft Excel (Advanced)", level: 92, tag: "Core" },
      { name: "XLOOKUP / INDEX-MATCH", level: 95, tag: "Lookup" },
      { name: "Pivot Tables & Slicers", level: 94, tag: "Reporting" },
      { name: "Conditional Logic & What-If", level: 88, tag: "Analysis" },
    ],
    description: "Financial modeling, automated data sanitization, executive reconciliation sheets, dynamic summary workbooks."
  },
  {
    category: "AI-Assisted Analytics & Engineering",
    icon: "sparkles",
    skills: [
      { name: "Prompt Engineering for Data", level: 90, tag: "AI" },
      { name: "Automated Data Summarization", level: 88, tag: "GenAI" },
      { name: "AI Insight Verification & Guardrails", level: 85, tag: "Quality" },
      { name: "Synthetic Dataset Generation", level: 84, tag: "Testing" },
    ],
    description: "Leveraging LLMs for anomaly storytelling, instant executive brief drafts, SQL query sanity checking, and schema mapping."
  },
  {
    category: "Core Analytical Concepts",
    icon: "pie-chart",
    skills: [
      { name: "Exploratory Data Analysis (EDA)", level: 92, tag: "Methods" },
      { name: "Descriptive & Inferential Statistics", level: 86, tag: "Theory" },
      { name: "KPI Framework Architecture", level: 90, tag: "Business" },
      { name: "Data Cleansing & Normalization", level: 95, tag: "ETL" },
    ],
    description: "Hypothesis validation, cohort breakdown, churn detection, outlier isolation (IQR/Z-Score), and metric definition."
  },
  {
    category: "Developer Tools & Platforms",
    icon: "git-branch",
    skills: [
      { name: "Git & GitHub", level: 88, tag: "Version Control" },
      { name: "Jupyter Notebooks", level: 94, tag: "Research" },
      { name: "VS Code", level: 90, tag: "IDE" },
      { name: "MySQL Workbench", level: 90, tag: "RDBMS" },
    ],
    description: "Reproducible research notebooks, collaborative version tracking, schema migration workflows, and script automation."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ai-sales-insights",
    title: "AI Sales Insights & Executive Revenue Intelligence Dashboard",
    subtitle: "End-to-End Sales Pipeline Analytics: From Raw Transaction Dumps to Automated AI Executive Briefs",
    category: "Business Intelligence",
    timeline: "April – June 2026",
    role: "Lead Data Analyst & BI Developer",
    tools: ["Power BI", "SQL (MySQL)", "Python (Pandas)", "Microsoft Excel", "Prompt Engineering"],
    metrics: [
      { label: "Total Revenue Tracked", value: "$4.82M", change: "+18.4% YoY", positive: true },
      { label: "Reporting Overhead Reduced", value: "72%", change: "-14 hrs/wk", positive: true },
      { label: "Customer Segments Profiled", value: "4 Distinct", change: "RFM Model", positive: true },
      { label: "Data Quality Score", value: "99.4%", change: "Automated ETL", positive: true },
    ],
    summary: "Built an enterprise-grade interactive sales analytics suite enabling C-level leaders and sales managers to monitor revenue pacing, margin retention, regional performance disparities, and repeat customer retention. Integrated an automated AI summarization layer to generate weekly executive takeaway memos.",
    problem: "The sales leadership team relied on disconnected, multi-sheet Excel files exported from legacy billing software. Inconsistent date formats, unhandled refund duplicates, disparate currency conversions, and lack of customer classification meant executives spent over 14 hours every Monday manually compiling figures with zero visibility into regional customer churn or product cross-sell opportunities.",
    solution: "Architected a unified analytical pipeline: ingestion and sanitization via Python/Pandas scripts, staging in a relational MySQL star schema with dedicated dimension tables (Date, Customer, Product, Region) and a transactional Fact_Sales table. Created an interactive Power BI dashboard featuring dynamic DAX time-intelligence measures (YoY, MoM, rolling 90-day margin), and integrated prompt-engineered AI summarization routines to output clear stakeholder narratives.",
    methodology: [
      {
        step: "01. Data Ingestion & Sanitization",
        title: "Python-driven Automated Cleaning",
        description: "Standardized 120,000+ transactional line items. Handled missing postal codes, normalized product SKU taxonomies, filtered test accounts, and resolved date timestamps across 3 global regions using Pandas."
      },
      {
        step: "02. Relational Star Schema Design",
        title: "MySQL Data Warehouse Architecture",
        description: "Constructed a 3NF relational schema transitioning into an analytical Star Schema. Built indexing on customer_id and transaction_date to accelerate query response times by 4.2x."
      },
      {
        step: "03. Advanced DAX & KPI Engineering",
        title: "Power BI Time Intelligence Modeling",
        description: "Authored 25+ robust DAX measures including SamePeriodLastYear, Sales CAGR, Pareto 80/20 product ranking, dynamic margin percentage, and target variance indicators."
      },
      {
        step: "04. AI-Powered Executive Reporting",
        title: "Prompt Engineering & Natural Language Narratives",
        description: "Implemented structured prompt templates feeding filtered aggregate tables into LLM APIs to generate 3-bullet executive summaries highlighting anomaly spikes and underperforming regional territories."
      }
    ],
    codeSnippets: [
      {
        language: "sql",
        title: "MySQL: Regional Sales Growth & Moving Average Window Query",
        code: `WITH MonthlyRegionalSales AS (
  SELECT 
    r.region_name,
    DATE_FORMAT(s.order_date, '%Y-%m') AS sales_month,
    SUM(s.order_amount - s.discount_amount) AS net_revenue,
    COUNT(DISTINCT s.customer_id) AS active_buyers
  FROM fact_sales s
  JOIN dim_region r ON s.region_id = r.region_id
  WHERE s.order_status = 'COMPLETED'
  GROUP BY r.region_name, DATE_FORMAT(s.order_date, '%Y-%m')
)
SELECT 
  region_name,
  sales_month,
  net_revenue,
  active_buyers,
  LAG(net_revenue, 1) OVER (
    PARTITION BY region_name ORDER BY sales_month
  ) AS prev_month_revenue,
  ROUND(
    (net_revenue - LAG(net_revenue, 1) OVER (PARTITION BY region_name ORDER BY sales_month)) 
    / NULLIF(LAG(net_revenue, 1) OVER (PARTITION BY region_name ORDER BY sales_month), 0) * 100, 
    2
  ) AS mom_growth_pct,
  AVG(net_revenue) OVER (
    PARTITION BY region_name ORDER BY sales_month 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS rolling_3mo_avg_revenue
FROM MonthlyRegionalSales
ORDER BY region_name, sales_month DESC;`
      },
      {
        language: "python",
        title: "Python: RFM Customer Segmentation & Anomaly Scrubbing",
        code: `import pandas as pd
import numpy as np

def clean_and_segment_sales(df: pd.DataFrame, snapshot_date: pd.Timestamp) -> pd.DataFrame:
    # 1. Clean missing values and erroneous negatives
    df = df.dropna(subset=['CustomerID', 'InvoiceDate', 'UnitPrice'])
    df = df[(df['Quantity'] > 0) & (df['UnitPrice'] > 0)].copy()
    
    # 2. Derive Total Price
    df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
    df['TotalAmount'] = df['Quantity'] * df['UnitPrice']
    
    # 3. Calculate RFM metrics per customer
    rfm = df.groupby('CustomerID').agg({
        'InvoiceDate': lambda x: (snapshot_date - x.max()).days,
        'InvoiceNo': 'nunique',
        'TotalAmount': 'sum'
    }).rename(columns={
        'InvoiceDate': 'Recency',
        'InvoiceNo': 'Frequency',
        'TotalAmount': 'Monetary'
    })
    
    # 4. Quantile binning for RFM scoring
    rfm['R_Score'] = pd.qcut(rfm['Recency'], 4, labels=[4, 3, 2, 1])
    rfm['F_Score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
    rfm['M_Score'] = pd.qcut(rfm['Monetary'], 4, labels=[1, 2, 3, 4])
    
    # 5. Composite Tier
    rfm['CustomerTier'] = np.where(
        (rfm['R_Score'].astype(int) >= 3) & (rfm['M_Score'].astype(int) >= 3), 
        'Champion / High Value',
        np.where(rfm['R_Score'].astype(int) <= 2, 'At Risk / Churning', 'Standard Steady')
    )
    return rfm`
      },
      {
        language: "dax",
        title: "Power BI DAX: Dynamic Year-over-Year Revenue & Margin Variance",
        code: `// DAX Measure: Net Revenue YoY Growth Percentage
Net Revenue YoY % = 
VAR CurrentRevenue = [Total Net Revenue]
VAR PriorYearRevenue = 
    CALCULATE(
        [Total Net Revenue],
        SAMEPERIODLASTYEAR('DimDate'[Date])
    )
VAR VarianceValue = CurrentRevenue - PriorYearRevenue
RETURN
    IF(
        NOT(ISBLANK(PriorYearRevenue)),
        DIVIDE(VarianceValue, PriorYearRevenue, 0),
        BLANK()
    )`
      }
    ],
    visualHighlights: {
      title: "Quarterly Revenue Breakdown by Region ($ Thousands)",
      description: "Visualizes the regional revenue trajectory demonstrating North America's recovery and EMEA's sustained margin expansion.",
      type: "bar"
    },
    keyTakeaways: [
      "Eliminated 14 hours of manual report assembly every week with an auto-refreshing Power BI model.",
      "Identified that top 15% of enterprise accounts contributed 64% of gross margin, leading to targeted retention campaigns.",
      "Introduced AI-generated weekly memo summaries that executives adopted for quarterly board updates."
    ],
    githubUrl: "https://github.com/negeinno"
  },
  {
    id: "hr-workforce-analytics",
    title: "HR Workforce & Talent Retention Analytics Solution",
    subtitle: "Mitigating Employee Attrition & Optimizing Recruitment Velocity with Data-Driven People Analytics",
    category: "Business Intelligence",
    timeline: "January – March 2026",
    role: "Data Analyst & Dashboard Designer",
    tools: ["Power BI", "Python (NumPy, Matplotlib)", "SQL (MySQL)", "Microsoft Excel", "AI Workforce Analytics"],
    metrics: [
      { label: "Workforce Records Analyzed", value: "1,450+", change: "Full Headcount", positive: true },
      { label: "Turnover Risk Detection", value: "88.5%", change: "High Precision", positive: true },
      { label: "Hiring Cycle Bottleneck Reduced", value: "17 Days", change: "From 45 to 28d", positive: true },
      { label: "Executive Adoption", value: "100%", change: "Weekly HR Reviews", positive: true },
    ],
    summary: "Engineered a high-impact People Analytics solution for analyzing employee performance tiers, tenure distribution, salary benchmarking, voluntary turnover, and department recruitment velocity. Incorporated predictive indicators and AI decision-support prompts to alert managers about high-flight-risk cohorts.",
    problem: "Human Resources leadership faced a spike in talent turnover within critical engineering and sales roles, but could only view attrition in rear-view quarterly spreadsheets. Key drivers like promotion stagnation, manager turnover, overtime fatigue, and compensation discrepancies went unnoticed until exit interviews, causing costly replacement delays of up to 45 days per vacancy.",
    solution: "Designed a centralized People Analytics system. Processed multi-year HR records through Python for data imputation, created standardized MySQL views tracking tenure cohorts, built a rich Power BI dashboard with department drill-down slices, and crafted an AI-assisted diagnostic assistant that generates intervention suggestions for managers.",
    methodology: [
      {
        step: "01. Dataset Harmonization",
        title: "Multi-Source HR Data Cleaning",
        description: "Merged employee master files, survey satisfaction scores, promotion histories, and timesheet logs. Imputed missing performance ratings and standardized compensation bands."
      },
      {
        step: "02. Feature Engineering & Flight Risk Metrics",
        title: "Tenure & Stagnation Cohort Analysis",
        description: "Calculated years-since-last-promotion, compensation-to-market ratio (compa-ratio), and overtime-frequency factors using Python Pandas to isolate leading indicators of turnover."
      },
      {
        step: "03. Interactive Power BI Storytelling",
        title: "Executive People Scorecard & Drill-Throughs",
        description: "Created intuitive tabs: Workforce Composition, Attrition Deep-Dive, Performance vs Compensation Matrix, and Recruitment Funnel Efficiency."
      },
      {
        step: "04. AI-Assisted People Insights",
        title: "Prescriptive Decision Support Prompts",
        description: "Configured intelligent prompt recipes to analyze turnover anomalies across departments and output actionable retention recommendations (e.g. compensation readjustment, internal mobility)."
      }
    ],
    codeSnippets: [
      {
        language: "python",
        title: "Python: Flight Risk Scoring & Departmental Attrition EDA",
        code: `import pandas as pd
import numpy as np

def compute_workforce_flight_risk(hr_df: pd.DataFrame) -> pd.DataFrame:
    df = hr_df.copy()
    
    # 1. Flag prolonged promotion latency (> 3 years in same grade)
    df['Promotion_Stagnant'] = (df['YearsSinceLastPromotion'] >= 3).astype(int)
    
    # 2. Flag high overtime and low satisfaction
    df['Overtime_Burnout'] = ((df['OverTime'] == 'Yes') & (df['JobSatisfaction'] <= 2)).astype(int)
    
    # 3. Calculate Compa-Ratio (Actual Salary vs Median Dept Salary)
    dept_medians = df.groupby('Department')['MonthlyIncome'].transform('median')
    df['Compa_Ratio'] = df['MonthlyIncome'] / dept_medians
    df['Underpaid_Flag'] = (df['Compa_Ratio'] < 0.88).astype(int)
    
    # 4. Composite Flight Risk Index (0 - 100 scale)
    weights = {'Promotion_Stagnant': 30, 'Overtime_Burnout': 40, 'Underpaid_Flag': 30}
    df['Flight_Risk_Index'] = (
        df['Promotion_Stagnant'] * weights['Promotion_Stagnant'] +
        df['Overtime_Burnout'] * weights['Overtime_Burnout'] +
        df['Underpaid_Flag'] * weights['Underpaid_Flag']
    )
    
    df['Risk_Category'] = pd.cut(
        df['Flight_Risk_Index'], 
        bins=[-1, 30, 65, 100], 
        labels=['Low Risk', 'Moderate Risk', 'Critical Risk']
    )
    return df`
      },
      {
        language: "sql",
        title: "SQL: Departmental Attrition Rate & Average Tenure Summary View",
        code: `CREATE OR REPLACE VIEW v_department_workforce_metrics AS
SELECT 
    d.department_name,
    COUNT(e.employee_id) AS total_headcount,
    SUM(CASE WHEN e.employment_status = 'Active' THEN 1 ELSE 0 END) AS active_headcount,
    SUM(CASE WHEN e.employment_status = 'Terminated' THEN 1 ELSE 0 END) AS separated_employees,
    ROUND(
        (SUM(CASE WHEN e.employment_status = 'Terminated' THEN 1.0 ELSE 0.0 END) / 
        NULLIF(COUNT(e.employee_id), 0)) * 100, 
        2
    ) AS attrition_rate_pct,
    ROUND(AVG(e.years_at_company), 1) AS avg_tenure_years,
    ROUND(AVG(e.performance_rating), 2) AS avg_performance_score,
    ROUND(AVG(e.monthly_compensation), 0) AS avg_monthly_compensation
FROM dim_department d
LEFT JOIN dim_employee e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name;`
      }
    ],
    visualHighlights: {
      title: "Attrition Rate by Department & Tenure Cohort (%)",
      description: "Visualizes the disproportionate 28% attrition rate in early-tenure (1-2 years) software engineering personnel vs 6% in senior staff.",
      type: "donut"
    },
    keyTakeaways: [
      "Revealed that employees with >3 years without promotion and compa-ratio < 0.85 had a 4.1x higher resignation frequency.",
      "Provided HR business partners with proactive retention alerts 60 days before critical evaluation cycles.",
      "Reduced hiring cycle turnaround from 45 days to 28 days by pinpointing technical screening stage bottlenecks."
    ],
    githubUrl: "https://github.com/negeinno"
  },
  {
    id: "academic-coordination-analytics",
    title: "Academic Operations & Class Representative Logistics Analytics",
    subtitle: "Data-Driven Communication Infrastructure & Operational Tracking for 70+ Engineering Students",
    category: "SQL & Data Modeling",
    timeline: "2024 – 2025",
    role: "Academic Class Representative & Operations Coordinator",
    tools: ["Microsoft Excel", "Google Sheets Automation", "Data Tracking", "Communication Protocols"],
    metrics: [
      { label: "Class Size Coordinated", value: "70+", change: "Students", positive: true },
      { label: "Academic Queries Resolved", value: "180+", change: "<24hr Turnaround", positive: true },
      { label: "Schedule Conflicts Prevented", value: "100%", change: "Zero Overlaps", positive: true },
      { label: "Faculty-Student Alignment", value: "98%", change: "Feedback Rating", positive: true },
    ],
    summary: "Served as the official Academic Class Representative at Chandigarh University, acting as the primary operational conduit between senior university faculty, academic departments, and a cohort of 70+ engineering students. Built a systematic query-tracking and timetable logistics dashboard to streamline communications.",
    problem: "Academic announcements, exam rescheduling, laboratory batch rotations, and student academic grievances were scattered across disparate messaging groups and verbal notices. This generated missed deadlines, overlapping exam prep sessions, and delayed administrative resolutions.",
    solution: "Established a structured data coordination system using centralized Excel and shared spreadsheets to log student concerns, categorize issues (curriculum, lab equipment, attendance discrepancies, exam dates), and track time-to-resolution. Coordinated with faculty to optimize lab batch splits and examination preparation schedules.",
    methodology: [
      {
        step: "01. Centralized Issue Tracker",
        title: "Categorization & SLA Monitoring",
        description: "Implemented a structured incident and query log categorizing student requests with target turnaround SLAs."
      },
      {
        step: "02. Schedule Synchronization",
        title: "Conflict-Free Timetable Modeling",
        description: "Mapped multi-subject laboratory schedules and elective allocations into a consolidated conflict matrix."
      },
      {
        step: "03. Faculty Liaison & Feedback Loops",
        title: "Bi-Weekly Sentiment & Performance Reviews",
        description: "Synthesized student academic feedback into objective summaries presented to professors and heads of departments."
      }
    ],
    codeSnippets: [
      {
        language: "excel",
        title: "Excel: Dynamic Class Attendance & Assessment Tracker Formulas",
        code: `=IF(ISBLANK(C2), "Pending Submission", 
  IF(C2 >= 75, "Eligible (Good Standing)", 
    CONCATENATE("Shortage Warning - Short by ", TEXT(75 - C2, "0.0"), "%")
  )
)

// Dynamic Lookup for Exam Slot Conflicts:
=INDEX(ScheduleMaster!$B$2:$B$120, 
  MATCH(1, (ScheduleMaster!$C$2:$C$120 = StudentCohort) * (ScheduleMaster!$D$2:$D$120 = ExamDate), 0)
)`
      }
    ],
    visualHighlights: {
      title: "Query Resolution SLA Distribution",
      description: "Visualizes turnaround time: 76% resolved within 12 hours, 22% within 24 hours, and only 2% requiring department escalation.",
      type: "kpi-grid"
    },
    keyTakeaways: [
      "Honed strong stakeholder management, cross-functional mediation, and human-centric leadership.",
      "Ensured 0 missed examination deadlines across 4 consecutive academic semesters.",
      "Proved that disciplined data organization transforms chaotic student operations into smooth execution."
    ]
  }
];

export const CERTIFICATIONS = [
  {
    title: "Cisco Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "2026",
    id: "CISCO-DA-9421",
    skills: ["Data Analytics Fundamentals", "Data Cleaning", "Statistical Reasoning", "Visual Storytelling"],
    verifyUrl: "#",
    color: "#00bceb",
  },
  {
    title: "IBM SQL: A Practical Introduction",
    issuer: "IBM / Coursera",
    date: "2026",
    id: "IBM-SQL-8310",
    skills: ["Relational Databases", "Complex Queries", "JOINs & Subqueries", "Schema DDL & DML"],
    verifyUrl: "#",
    color: "#054ada",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan / Charles Severance",
    date: "2025",
    id: "UMICH-PY-1092",
    skills: ["Python Core Syntax", "Data Structures", "Algorithmic Logic", "File Processing"],
    verifyUrl: "#",
    color: "#ffcb05",
  }
];

export const EDUCATION = {
  degree: "Bachelor of Engineering (Computer Science Engineering)",
  institution: "Chandigarh University",
  period: "2022 – 2026",
  cgpa: "7.66 / 10",
  coursework: [
    "Database Management Systems (DBMS)",
    "Object-Oriented Programming (Python)",
    "Probability, Statistics & Linear Algebra",
    "Data Structures & Algorithms",
    "Computer Networks & Operating Systems",
    "Software Engineering & Agile Methodologies"
  ]
};

export const DATA_METHODOLOGY_STEPS = [
  {
    step: "01",
    name: "Business Discovery & KPI Definition",
    icon: "target",
    desc: "Collaborating with stakeholders to understand business objectives, identifying core North Star metrics, and establishing quantitative definitions for success."
  },
  {
    step: "02",
    name: "Data Extraction & Ingestion",
    icon: "database",
    desc: "Writing optimized SQL queries and Python scripts to extract raw transactions from RDBMS tables, ERP exports, and cloud data warehouses."
  },
  {
    step: "03",
    name: "Auditing, Cleaning & Validation",
    icon: "check-circle",
    desc: "Treating missing values, removing duplicates, detecting statistical outliers (IQR/Z-score), normalizing data types, and verifying 99.8%+ schema integrity."
  },
  {
    step: "04",
    name: "Dimensional Modeling & DAX Engineering",
    icon: "layers",
    desc: "Designing Star/Snowflake schemas with distinct Fact and Dimension tables. Writing time-intelligence DAX measures and calculated columns."
  },
  {
    step: "05",
    name: "Visual Storytelling & Dashboard UX",
    icon: "layout",
    desc: "Designing intuitive, distraction-free visual layouts with high data-to-ink ratios, smart drill-throughs, dynamic filters, and mobile responsiveness."
  },
  {
    step: "06",
    name: "AI Insights & Decision Support",
    icon: "cpu",
    desc: "Empowering business leaders with prompt-engineered AI summaries that translate charts into actionable next-quarter recommendations."
  }
];
