import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { categories } from "../../../assets/data.json";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { SkeletonLoader } from "../../../components/loader";
import { usePieQuery } from "../../../redux/api/dashBoardAPI";
import { RootState } from "../../../redux/store";

const PieCharts = () => {
  const {user} = useSelector((state:RootState) => state.userReducer);

  const {isLoading,data,isError} = usePieQuery(user!._id);

  const charts = data?.charts;

  if(isError) return < Navigate to= {"/admin/dashboard"} />

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? <SkeletonLoader/> : 
         <>
          <section>
            <div>
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[charts!.orderFullfillment.processing, charts!.orderFullfillment.shipped, charts!.orderFullfillment.delivered]}
                backgroundColor={[
                  `hsl(110,80%, 80%)`,
                  `hsl(110,80%, 50%)`,
                  `hsl(110,40%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Order Fulfillment Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={charts!.productCategories.map(
                  (i) => Object.keys(i)[0]
                )}
                data={charts!.productCategories.map(
                  (i) => Object.values(i)[0]
                )}
                backgroundColor={categories.map(
                  (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
                )}
                legends={false}
                offset={[0, 0, 0, 80]}
              />
            </div>
            <h2>Product Categories Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[charts!.stockAvailability.inStock, charts!.stockAvailability.outOfStock]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
            <h2> Stock Availability</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[
                       charts!.revenueDistribution.marketingCost, 
                       charts!.revenueDistribution.discount, 
                       charts!.revenueDistribution.burnt, 
                       charts!.revenueDistribution.productionCost, 
                       charts!.revenueDistribution.netMargin]}
                backgroundColor={[
                  "hsl(110,80%,40%)",
                  "hsl(19,80%,40%)",
                  "hsl(69,80%,40%)",
                  "hsl(300,80%,40%)",
                  "rgb(53, 162, 255)",
                ]}
                legends={false}
                offset={[20, 30, 20, 30, 80]}
              />
            </div>
            <h2>Revenue Distribution</h2>
          </section>

          <section>
            <div>
              <PieChart
                labels={[
                  "Teenager(Below 20)",
                  "Adult (20-40)",
                  "Older (above 40)",
                ]}
                data={[
                      charts!.usersAgeGroup.teen, 
                      charts!.usersAgeGroup.adult, 
                      charts!.usersAgeGroup.old, 
                    ]}
                backgroundColor={[
                  `hsl(10, ${80}%, 80%)`,
                  `hsl(10, ${80}%, 50%)`,
                  `hsl(10, ${40}%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Users Age Group</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["Admin", "Customers"]}
                data={[charts!.adminCustomer.admin, charts!.adminCustomer.customer]}
                backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                offset={[0, 50]}
              />
            </div>
          </section>
         </>
        }
      </main>
    </div>
  );
};

export default PieCharts;
