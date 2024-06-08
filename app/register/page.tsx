import Navbar from "../components/Navbar/Navbar";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

export default function Register() {
    return (
        <>
          <div className="h-lvh flex justify-center items-center" >
           <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your email below to Register to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register</Button>
            </CardFooter>
          </Card>
        </div>
        </>
    )
}