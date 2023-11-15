namespace Models
{
    public class DashboardCountModel
    {
        public int CustomerCount { get; set; }
        public int RevenueCount { get; set; }
        public int SalesCount { get; set; }
        public int CustomerCountMonth { get; set; }
        public int CustomerCountYear { get; set; }
        public int RevenueCountMonth { get; set; }
        public int RevenueCountYear { get; set; }
        public int SalesCountMonth { get; set; }
        public int SalesCountYear { get; set; }
        public int TopSellingProduct{get; set;}
    }
}
