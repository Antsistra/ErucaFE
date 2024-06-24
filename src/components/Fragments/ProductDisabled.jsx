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

const ProductCardDisabled = (props) => {
  const {
    productImage,
    productTitle,
    productDescription,
    productPrice,
  } = props;
  return (
    <>
      <Card className="w-[350px] bg-red-600">
        <CardHeader className="-mb-8"></CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <img
                className="w-full  h-40 object-cover rounded-lg"
                src={productImage}
                alt=""
              />
            </div>
          </form>
          <CardTitle className="mt-4">
            {productTitle}
          </CardTitle>
          <CardDescription className="text-s mt-4">
            {productDescription}
          </CardDescription>
          <CardDescription className="text-xl mt-4 justify-end flex font-bold text-black -mb-4">
            {productPrice}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button className="bg-[#D7AF70] ">🛒</Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default ProductCardDisabled;
