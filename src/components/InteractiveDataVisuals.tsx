import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  ArrowUpRight, 
  Sparkles, 
  Copy, 
  Check, 
  Code2, 
  SlidersHorizontal 
} from 'lucide-react';

// --- Interactive Sales Dashboard Preview Component ---
export const SalesDashboardVisualizer = () => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'North America' | 'Europe' | 'Asia-Pacific'>('All');

  const regionalData = {
    'All': { revenue: '$4.82M', growth: '+18.4%', margin: '34.2%', orders: '124,500', topCategory: 'Enterprise SaaS' },
    'North America': { revenue: '$2.15M', growth: '+21.2%', margin: '36.8%', orders: '54,200', topCategory: 'Cloud Storage' },
    'Europe': { revenue: '$1.62M', growth: '+16.5%', margin: '32.1%', orders: '41,800', topCategory: 'Analytics Pro' },
    'Asia-Pacific': { revenue: '$1.05M', growth: '+14.9%', margin: '31.5%', orders: '28,500', topCategory: 'Security Suite' },
  };

  const chartData = [
    { month: 'Jan', val: 68, target: 60, rev: '$340k' },
    { month: 'Feb', val: 74, target: 65, rev: '$370k' },
    { month: 'Mar', val: 82, target: 75, rev: '$410k' },
    { month: 'Apr', val: 78, target: 80, rev: '$390k' },
    { month: 'May', val: 91, target: 85, rev: '$455k' },
    { month: 'Jun', val: 96, target: 90, rev: '$480k' },
    { month: 'Jul', val: 89, target: 88, rev: '$445k' },
    { month: 'Aug', val: 94, target: 90, rev: '$470k' },
    { month: 'Sep', val: 102, target: 95, rev: '$510k' },
    { month: 'Oct', val: 108, target: 100, rev: '$540k' },
    { month: 'Nov', val: 115, target: 105, rev: '$575k' },
    { month: 'Dec', val: 122, target: 110, rev: '$610k' },
  ];

  const current = regionalData[selectedRegion];

  return (
    <div className="bg-[#12141c] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans">
      {/* Dashboard Top Header Bar */}
      <div className="bg-[#1a1d28] px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight flex items-center gap-2">
              AI Sales Executive Intelligence
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span> Live Power BI Model
              </span>
            </h4>
            <p className="text-[11px] text-gray-400">SQL Data Mart • Star Schema • Auto-Refreshed via Python ETL</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Region:
          </span>
          {(['All', 'North America', 'Europe', 'Asia-Pacific'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                selectedRegion === r
                  ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-[#141722]/60 border-b border-white/5">
        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Net Billed Revenue</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black tracking-tight">{current.revenue}</span>
            <span className="text-xs text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> {current.growth}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">vs. Prior Year Baseline</p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Gross Profit Margin</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black tracking-tight">{current.margin}</span>
            <span className="text-xs text-emerald-400 font-bold">+2.8% YoY</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">DAX Margin Calculation</p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Orders Processed</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl md:text-2xl font-black tracking-tight">{current.orders}</span>
            <span className="text-xs text-emerald-400 font-bold">+12%</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Distinct Sales Transactions</p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Lead Product Tier</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base md:text-lg font-bold text-orange-400 truncate">{current.topCategory}</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">64% Contribution Margin</p>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Monthly Revenue vs Target Pace (FY 2026)
            </h5>
            <p className="text-[11px] text-gray-400">Bars represent actual net revenue; dashed line represents sales quota</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-500"></span> Actual Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-1 bg-white/40"></span> Quota Baseline
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-44 w-full flex items-end gap-2 sm:gap-3 pt-6 pb-2 border-b border-white/10 px-1">
          {chartData.map((d, i) => {
            const heightPct = (d.val / 130) * 100;
            const targetPct = (d.target / 130) * 100;
            const isBeating = d.val >= d.target;
            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-12 bg-black/90 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-white/20 shadow-xl">
                  <div className="font-bold">{d.month} 2026: {d.rev}</div>
                  <div className="text-gray-400">Target: {Math.round((d.target / d.val) * 100)}% met</div>
                </div>

                {/* Target line tick */}
                <div 
                  className="absolute w-full border-t border-dashed border-white/50 z-10 pointer-events-none" 
                  style={{ bottom: `${targetPct}%` }}
                />

                {/* Bar */}
                <div 
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    isBeating 
                      ? 'bg-gradient-to-t from-orange-600 to-amber-400 group-hover:from-orange-500 group-hover:to-amber-300' 
                      : 'bg-gradient-to-t from-gray-600 to-gray-400'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />

                <span className="text-[10px] text-gray-400 mt-2 font-mono">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Executive Insight Callout Footer */}
      <div className="bg-[#171a26] p-4 border-t border-white/10 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-indigo-300">AI-Generated Executive Summary Memo</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">Automated Prompt</span>
          </div>
          <p className="text-gray-300 leading-relaxed text-[11px]">
            {selectedRegion === 'All' && 
              "\"Q4 achieved 118% quota fulfillment driven by Enterprise tier upgrades. Europe and North America cross-selling reduced customer acquisition payback to 4.2 months. Recommended Action: Scale Q1 sales headcount toward EMEA cloud renewals.\""
            }
            {selectedRegion === 'North America' && 
              "\"North America surged +21.2% YoY, establishing highest gross margins (36.8%). Large deal velocity peaked in November/December. Recommended Action: Secure multi-year contract locks before Q2 renewals.\""
            }
            {selectedRegion === 'Europe' && 
              "\"EMEA generated stable 16.5% YoY expansion. Analytics Pro adoption increased 24% among mid-market accounts. Recommended Action: Address localized VAT billing workflows to minimize order drop-off.\""
            }
            {selectedRegion === 'Asia-Pacific' && 
              "\"APAC market demonstrated 14.9% top-line acceleration with Security Suite gaining traction. Recommended Action: Expand localized partner distribution channels.\""
            }
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Interactive HR Workforce Analytics Component ---
export const HRWorkforceVisualizer = () => {
  const [activeDept, setActiveDept] = useState<'All' | 'Engineering' | 'Sales' | 'Product' | 'Operations'>('All');

  const deptMetrics = {
    'All': { headcount: 1450, attrition: '12.4%', avgTenure: '3.4 yrs', flightRisk: '48 High' },
    'Engineering': { headcount: 520, attrition: '16.8%', avgTenure: '2.8 yrs', flightRisk: '24 High' },
    'Sales': { headcount: 380, attrition: '14.2%', avgTenure: '2.2 yrs', flightRisk: '15 High' },
    'Product': { headcount: 240, attrition: '8.1%', avgTenure: '4.1 yrs', flightRisk: '4 High' },
    'Operations': { headcount: 310, attrition: '7.5%', avgTenure: '4.6 yrs', flightRisk: '5 High' },
  };

  const curr = deptMetrics[activeDept];

  const attritionFactors = [
    { factor: 'Stagnant Promotion (> 3 yrs)', impact: 38, color: 'bg-red-500' },
    { factor: 'Comp Below Market Median (< 0.88x)', impact: 29, color: 'bg-amber-500' },
    { factor: 'Excessive Overtime Burden', impact: 21, color: 'bg-purple-500' },
    { factor: 'Manager Rotation Disruption', impact: 12, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-[#12141c] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-[#1a1d28] px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight flex items-center gap-2">
              HR Workforce & Talent Retention Analytics
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30 font-mono">
                Power BI • Python EDA
              </span>
            </h4>
            <p className="text-[11px] text-gray-400">People Analytics Suite • Flight-Risk Early Warning Engine</p>
          </div>
        </div>

        {/* Dept Selector */}
        <div className="flex items-center gap-2">
          {(['All', 'Engineering', 'Sales', 'Product', 'Operations'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                activeDept === dept
                  ? 'bg-teal-500 text-white font-semibold shadow-md shadow-teal-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-[#141722]/60 border-b border-white/5">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Active Headcount</p>
          <p className="text-xl md:text-2xl font-black mt-1 text-white">{curr.headcount}</p>
          <p className="text-[10px] text-gray-500">Tracked in RDBMS</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Annual Attrition</p>
          <p className="text-xl md:text-2xl font-black mt-1 text-amber-400">{curr.attrition}</p>
          <p className="text-[10px] text-emerald-400">-3.2% vs prior benchmark</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Average Tenure</p>
          <p className="text-xl md:text-2xl font-black mt-1 text-white">{curr.avgTenure}</p>
          <p className="text-[10px] text-gray-500">Cohort distribution</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Critical Flight Risk</p>
          <p className="text-xl md:text-2xl font-black mt-1 text-red-400">{curr.flightRisk}</p>
          <p className="text-[10px] text-gray-400">Algorithmic Alert</p>
        </div>
      </div>

      {/* Drill-down Analytics View */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center justify-between">
            <span>Primary Root Drivers of Voluntary Turnover</span>
            <span className="text-[10px] text-teal-400 font-mono">Python Feature Importance</span>
          </h5>
          <div className="space-y-3">
            {attritionFactors.map((f, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>{f.factor}</span>
                  <span className="font-mono font-bold">{f.impact}% weight</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${f.color}`} style={{ width: `${f.impact * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Hiring Pipeline Funnel Velocity</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">-17 Days Gained</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
              Pinpointed stage drop-offs between technical assessment and final offer generation.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Application to First Screen:</span>
                <span className="font-semibold text-white">4 Days (was 8)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Tech Assessment Review:</span>
                <span className="font-semibold text-white">6 Days (was 14)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Offer to Acceptance:</span>
                <span className="font-semibold text-white">5 Days (was 9)</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-teal-300">
                <span>Total Cycle Time:</span>
                <span>28 Days (Industry avg: 45d)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Interactive Code & Query Explorer Component ---
export const CodeQueryExplorer = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'python' | 'dax' | 'excel'>('sql');
  const [copied, setCopied] = useState(false);

  const snippets = {
    sql: {
      title: "MySQL: RFM Recency-Frequency-Monetary Customer CTE",
      code: `-- Customer RFM Segmentation & Cohort Performance
WITH CustomerTransactions AS (
    SELECT 
        c.customer_id,
        CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
        c.acquisition_channel,
        MAX(s.order_date) AS last_purchase_date,
        COUNT(DISTINCT s.order_id) AS total_orders,
        SUM(s.net_amount) AS total_spend,
        DATEDIFF('2026-06-30', MAX(s.order_date)) AS recency_days
    FROM dim_customer c
    JOIN fact_sales s ON c.customer_id = s.customer_id
    WHERE s.order_status = 'COMPLETED'
    GROUP BY c.customer_id, c.first_name, c.last_name, c.acquisition_channel
),
ScoredTiers AS (
    SELECT 
        customer_id,
        customer_name,
        acquisition_channel,
        recency_days,
        total_orders,
        total_spend,
        NTILE(4) OVER (ORDER BY recency_days DESC) AS r_rank,
        NTILE(4) OVER (ORDER BY total_orders ASC) AS f_rank,
        NTILE(4) OVER (ORDER BY total_spend ASC) AS m_rank
    FROM CustomerTransactions
)
SELECT 
    customer_id,
    customer_name,
    total_spend,
    recency_days,
    CASE 
        WHEN r_rank >= 3 AND m_rank >= 3 THEN 'High-Value Champion'
        WHEN r_rank <= 2 AND m_rank >= 3 THEN 'At-Risk Big Spender'
        WHEN r_rank >= 3 AND m_rank <= 2 THEN 'New Promising Buyer'
        ELSE 'Hibernating / Standard'
    END AS customer_persona
FROM ScoredTiers
ORDER BY total_spend DESC
LIMIT 10;`,
      tech: "MySQL 8.0 • CTEs • NTILE Window Functions"
    },
    python: {
      title: "Python: Automated Outlier Scrubbing & EDA Correlation Matrix",
      code: `import pandas as pd
import numpy as np

def sanitize_and_correlate(df: pd.DataFrame) -> dict:
    """
    Automated data cleansing routine:
    1. Trims IQR outliers on continuous revenue metrics
    2. Imputes missing numerical records with median
    3. Computes Pearson correlation matrix for KPI discovery
    """
    cleaned = df.copy()
    
    # 1. IQR Outlier Filtering for Revenue
    q25, q75 = cleaned['order_amount'].quantile([0.25, 0.75])
    iqr = q75 - q25
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    
    cleaned['is_outlier'] = (
        (cleaned['order_amount'] < lower_bound) | 
        (cleaned['order_amount'] > upper_bound)
    )
    
    # 2. Impute satisfaction & lead response times with median
    cleaned['satisfaction_score'] = cleaned['satisfaction_score'].fillna(
        cleaned['satisfaction_score'].median()
    )
    
    # 3. Correlation Matrix
    numeric_cols = ['order_amount', 'discount_pct', 'customer_tenure_months', 'satisfaction_score']
    corr_matrix = cleaned[numeric_cols].corr(method='pearson')
    
    return {
        'cleaned_rows': len(cleaned[~cleaned['is_outlier']]),
        'outliers_flagged': int(cleaned['is_outlier'].sum()),
        'correlations': corr_matrix.round(3).to_dict()
    }`,
      tech: "Python 3.12 • Pandas • NumPy"
    },
    dax: {
      title: "Power BI DAX: Dynamic Moving Average & Pareto 80/20 Measure",
      code: `// DAX Measure: Rolling 90-Day Revenue Pacing
Revenue Rolling 90D = 
VAR LastSelectedDate = MAX('DimDate'[Date])
VAR RollingPeriod = 
    DATESBETWEEN(
        'DimDate'[Date],
        LastSelectedDate - 89,
        LastSelectedDate
    )
RETURN
    CALCULATE(
        [Total Net Revenue],
        RollingPeriod
    )

// DAX Measure: Cumulative Revenue % for Pareto Analysis
Pareto Cumulative Rev % = 
VAR CurrentProductRev = [Total Net Revenue]
VAR TotalSalesAllProducts = 
    CALCULATE(
        [Total Net Revenue], 
        ALLSELECTED('DimProduct')
    )
VAR RunningTotalRev = 
    CALCULATE(
        [Total Net Revenue],
        FILTER(
            ALLSELECTED('DimProduct'),
            [Total Net Revenue] >= CurrentProductRev
        )
    )
RETURN
    DIVIDE(RunningTotalRev, TotalSalesAllProducts, 0)`,
      tech: "Power BI DAX • Time Intelligence • Filter Context Manipulation"
    },
    excel: {
      title: "Microsoft Excel: Advanced Dynamic XLOOKUP & Multi-Criteria Array",
      code: `// Multi-Condition Dynamic Dynamic Array Lookup with Error Handling:
=XLOOKUP(
    1,
    (SalesData[Region] = "North America") * 
    (SalesData[Quarter] = "Q4") * 
    (SalesData[Tier] = "Enterprise"),
    SalesData[GrossRevenue],
    "Record Not Found",
    0
)

// Dynamic Top 5 Revenue SKU Extraction:
=TAKE(
    SORTBY(
        CHOOSECOLS(ProductCatalog, 1, 3, 5), 
        ProductCatalog[TotalVolume], 
        -1
    ), 
    5
)`,
      tech: "Microsoft Excel 365 • Dynamic Arrays • Boolean Matrix Multiplication"
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0e1017] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Code Viewer Nav */}
      <div className="bg-[#161922] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
            {(['sql', 'python', 'dax', 'excel'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-md font-mono uppercase font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
            {snippets[activeTab].tech}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Code Title Bar */}
      <div className="px-5 py-2.5 bg-[#12141c] border-b border-white/5 flex items-center justify-between text-xs text-gray-400">
        <span className="font-semibold text-gray-300 flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-orange-400" />
          {snippets[activeTab].title}
        </span>
        <span className="font-mono text-[10px] text-gray-500">UTF-8 • Production Ready</span>
      </div>

      {/* Syntax Box */}
      <div className="p-5 overflow-x-auto max-h-[380px] bg-[#090b10] text-gray-200 font-mono text-xs leading-relaxed selection:bg-orange-500/40">
        <pre><code>{snippets[activeTab].code}</code></pre>
      </div>
    </div>
  );
};
