import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDashboardData } from "../hooks/useDashboardData";

const AnalyticsDashboard = () => {
    const { data, status, error } = useDashboardData();

    return <>
        <h1 className="mb-2 font-bold text-2xl leading-1">Dashboard Analytics</h1>

        <div className="w-1/2 h-[60vh] overflow-y-auto overflow-x-hidden">
            {
                data && data.pages.length === 0 ? <p>Aucune donnée disponible sur les pages les plus consultées.</p>
                : <div className="flex flex-col items-center w-full">
                    <h2 className="font-semibold">Pages les plus consultées</h2>
                    <ResponsiveContainer width={"100%"} height={500}>
                        <BarChart data={data.pages} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" tick={{ fontSize: 13 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                                labelStyle={{ fontWeight: "bold" }}
                            />
                            <Bar dataKey="count" fill="#319795" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
            {
                data && data.users.length === 0 ? <p>Aucune donnée disponible sur les utilisateurs les plus actives.</p>
                : <div className="flex flex-col items-center w-full">
                    <h2 className="font-semibold">Utilisateurs les plus actives</h2>
                    <ResponsiveContainer width={"100%"} height={500}>
                        <BarChart data={data.users} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" tick={{ fontSize: 13 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                                labelStyle={{ fontWeight: "bold" }}
                            />
                            <Bar dataKey="count" fill="#319795" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>
    </>
}

export default AnalyticsDashboard;