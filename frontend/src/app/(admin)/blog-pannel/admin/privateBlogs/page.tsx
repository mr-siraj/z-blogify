import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function PrivateBlogs() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Private Blogs</CardTitle>
              <CardDescription>
                Modified your private blogs and share it with public
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell ">
                      <span className="font-medium">Post No.</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Blogs Description</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created At
                    </TableHead>
                    <TableHead>
                      <span className="font-medium">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="b">
                  <TableRow className="">
                    <TableCell className="hidden sm:table-cell">1</TableCell>
                    <TableCell className="font-medium">
                      How to train Your Dragon
                    </TableCell>
                    <TableCell className=" max-w-[300px] text-clip line-clamp-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio error at deserunt eveniet quia cupiditate atque
                      quibusdam odit. Ea, illo?
                    </TableCell>
                    <TableCell>Zlaam</TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-07-12 10:42 AM
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Make this Public</DropdownMenuItem>
                          <DropdownMenuItem>Read this Blog</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}