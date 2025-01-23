import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <Card className="w-[400px] h-[400px]">
        <CardHeader>
          <img src="/food.png" className="h-[200px]"></img>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p className="text-red-700 text-2xl">Finger Food </p>
          <p className="font-bold text-2xl">$ 12.99</p>
        </CardContent>
        <CardFooter>
          <p>
            Fluppy pancakes stacked with fruits, cream, syrup, and powdered
            sugar.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
