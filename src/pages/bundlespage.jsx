import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog.jsx";
import { BASE_URL } from "../lib/utils";

console.log('UI Components:', { Card, Button, Table, Dialog });

const mockBundles = [
    { id: 1, name: "Daily 1GB", price: 50, duration: "1 Day", quota: "1 GB" },
    { id: 2, name: "Weekly 5GB", price: 250, duration: "7 Days", quota: "5 GB" },
    { id: 3, name: "Monthly 20GB", price: 1000, duration: "30 Days", quota: "20 GB" },
];

export default function BundlesPage() {
    const [bundles, setBundles] = useState(mockBundles);
    const [loading, setloading] = useState(false)
    const [newBundle, setNewBundle] = useState({ name: "", price: "", duration: "", quota: "" });

    // useEffect(() => {
    //     const fetchBundles = async () => {
    //         try {
    //             setloading(true)
    //             const response = await fetch(`${BASE_URL}/bundles`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (!response.ok) {
    //                 console.error("Failed to fetch bundles")
    //             };
    //             const data = await response.json();
    //             console.log(data)
    //             setBundles(data);
    //         } catch (error) {
    //             console.error(`A ${error} occurred`, error)
    //         } finally {
    //             setloading(false);
    //         };
    //     };
    //     fetchBundles();
    // });

    const addBundle = () => {
        setLoading(true);
        if (!newBundle.name || !newBundle.price) return;
        setBundles([...bundles, { id: bundles.length + 1, ...newBundle }]);
        setNewBundle({ name: "", price: "", duration: "", quota: "" });
        setloading(false);
    };

    const deleteBundle = (id) => {
        setBundles(bundles.filter((b) => b.id !== id));
    };

    if (loading) return <div>Loading...</div>

    return (
        <div className="p-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">Manage Bundles</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Bundle</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Bundle</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-3">
                                <Input
                                    placeholder="Bundle Name"
                                    value={newBundle.name}
                                    onChange={(e) => setNewBundle({ ...newBundle, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Quota (e.g. 5 GB)"
                                    value={newBundle.quota}
                                    onChange={(e) => setNewBundle({ ...newBundle, quota: e.target.value })}
                                />
                                <Input
                                    placeholder="Duration (e.g. 7 Days)"
                                    value={newBundle.duration}
                                    onChange={(e) => setNewBundle({ ...newBundle, duration: e.target.value })}
                                />
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={newBundle.price}
                                    onChange={(e) => setNewBundle({ ...newBundle, price: e.target.value })}
                                />
                                <Button onClick={addBundle}>Save</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Quota</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Price (KES)</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bundles.map((bundle) => (
                                <TableRow key={bundle.id}>
                                    <TableCell>{bundle.id}</TableCell>
                                    <TableCell>{bundle.name}</TableCell>
                                    <TableCell>{bundle.quota}</TableCell>
                                    <TableCell>{bundle.duration}</TableCell>
                                    <TableCell>{bundle.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteBundle(bundle.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {bundles.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        No bundles available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
