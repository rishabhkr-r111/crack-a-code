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

export default function Login() {
    return (
        <>
          <div className="h-lvh flex justify-center items-center" >
           <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
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
            </CardContent>
            <div className="text-center mb-5">click her to <Link href="/register" className="font-bold text-green-700">register</Link></div>
            <CardFooter>
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </Card>
        </div>
        </>
    )
}