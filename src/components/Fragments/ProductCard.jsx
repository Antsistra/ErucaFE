import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = (props) => {
  const {
    productImage,
    productTitle,
    productDescription,
    productPrice,
    classMain,
    btnClass,
    btnChildren,
    onClick,
    descriptionClass,
  } = props;
  return (
    <>
      <Card className={`w-[350px] ${classMain}`}>
        <CardHeader className="-mb-8"></CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 ">
              <img
                className="w-full  h-40 object-cover rounded-lg"
                src={productImage}
                alt=""
              />
            </div>
          </form>
          <CardTitle className="mt-4 font-bold text-primaryGreen dark:text-primaryOrange">
            {productTitle}
          </CardTitle>
          <CardDescription
            className={`text-s mt-4 ${descriptionClass}`}>
            {productDescription}
          </CardDescription>
          <CardDescription className="text-xl mt-4 justify-end flex font-bold text-black dark:text-white -mb-4 ">
            {productPrice}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            className={`bg-[#D7AF70] ${btnClass}`}
            onClick={onClick}>
            {btnChildren}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default ProductCard;
