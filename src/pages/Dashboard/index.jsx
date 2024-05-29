import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/charts';
import MainLayout from '../../infrastructure/common/layouts/MainLayout';
import dashboardService from '../../infrastructure/repositories/dashboard/service/dashboard.service';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';

const Dashboard = () => {
    const [revenue, setRevenue] = useState([]);
    const [loading, setLoading] = useState(false);

    const onGetRevenueAsync = async () => {
        try {
            await dashboardService.getDashboard(
                {},
                setLoading
            ).then((res) => {
                setRevenue(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetRevenueAsync().then(() => { })
    }, [])
    const config = {
        data: revenue || [],
        xField: 'month',
        yField: 'totalAmount',
        tooltip: {
            title: "Datefasdf",
            items: [{ channel: "x" }, { channel: "y" }],
        },
        point: {
            shapeField: "square",
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    }
    return (
        <MainLayout breadcrumb={"Báo cáo thống kê"} title={"Báo cáo doanh số"} redirect={""}>
            <div className='border-2 border-[#0940747d]'>
                <Line {...config} />
            </div>
            <p className='text-[16px] font-semibold mt-8 text-[#094074] text-center italic'>Biểu đồ báo cáo doanh thu</p>
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default Dashboard