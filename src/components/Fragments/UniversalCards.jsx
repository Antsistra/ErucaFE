import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const UniversalCards = (props) => {
  const { title, desc } = props;
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-semibold text-center -mb-4">
              {title}
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold text-center">
            {desc}
          </h1>
        </CardContent>
      </Card>
    </>
  );
};

export default UniversalCards;
