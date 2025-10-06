import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const mockTickets = [
    {
        id: 1,
        user: "John Doe",
        subject: "Failed Payment",
        message: "My payment went through but bundle not activated.",
        status: "OPEN",
        created_at: "2025-09-20 10:32",
    },
    {
        id: 2,
        user: "Jane Smith",
        subject: "Slow Connection",
        message: "The speed is much slower than promised.",
        status: "IN_PROGRESS",
        created_at: "2025-09-19 15:45",
    },
    {
        id: 3,
        user: "Ali Hassan",
        subject: "Refund Request",
        message: "Bundle expired immediately after activation.",
        status: "RESOLVED",
        created_at: "2025-09-18 09:10",
    },
];

export default function SupportTicketsPage() {
    const [tickets, setTickets] = useState(mockTickets);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    const handleStatusChange = (id, newStatus) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
    };

    const fetchTickets = async()=> {
        try {
            setLoading(true);
            const response = await fetch('/api/tickets');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false)
        }
    }

    // useEffect(()=>{
    //     fetchTickets();
    // },[])

    const statusColors = {
        OPEN: "bg-red-500 text-white",
        IN_PROGRESS: "bg-yellow-500 text-white",
        RESOLVED: "bg-green-500 text-white",
        CLOSED: "bg-gray-500 text-white",
    };

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            ticket.user.toLowerCase().includes(search.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "ALL" || ticket.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="h-full flex flex-col">
            <Card className="shadow-lg rounded-2xl flex flex-col h-full">
                <CardHeader className="flex justify-between items-center pb-4">
                    <CardTitle className="text-xl font-bold">Support Tickets</CardTitle>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Input
                            placeholder="Search by user or subject..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-[250px]"
                        />
                        <Select onValueChange={setFilter} defaultValue="ALL">
                            <SelectTrigger className="w-full md:w-[160px]">
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                <SelectItem value="OPEN">Open</SelectItem>
                                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                <SelectItem value="RESOLVED">Resolved</SelectItem>
                                <SelectItem value="CLOSED">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto p-0">
                    <div className="p-4">
                        <Table className="w-full bg-white rounded-lg">
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="p-3 text-left font-semibold">ID</TableHead>
                                    <TableHead className="p-3 text-left font-semibold">User</TableHead>
                                    <TableHead className="p-3 text-left font-semibold">Subject</TableHead>
                                    <TableHead className="hidden md:table-cell p-3 text-left font-semibold">Message</TableHead>
                                    <TableHead className="p-3 text-left font-semibold">Status</TableHead>
                                    <TableHead className="p-3 text-left font-semibold">Created At</TableHead>
                                    <TableHead className="p-3 text-left font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTickets.map((ticket) => (
                                    <TableRow key={ticket.id} className="border-b hover:bg-gray-50">
                                        <TableCell className="p-3">{ticket.id}</TableCell>
                                        <TableCell className="p-3">{ticket.user}</TableCell>
                                        <TableCell className="p-3">{ticket.subject}</TableCell>
                                        <TableCell className="hidden md:table-cell p-3 max-w-xs truncate">
                                            {ticket.message}
                                        </TableCell>
                                        <TableCell className="p-3">
                                            <Badge className={statusColors[ticket.status]}>
                                                {ticket.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="p-3">{ticket.created_at}</TableCell>
                                        <TableCell className="p-3">
                                            <Select
                                                onValueChange={(val) => handleStatusChange(ticket.id, val)}
                                                defaultValue={ticket.status}
                                            >
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Update status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="OPEN">Open</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                                                    <SelectItem value="CLOSED">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredTickets.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                                            No tickets found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
