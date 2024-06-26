import AlertCart from "@/components/molecules/carts/AlertCart";
import BlankCard from "@/components/molecules/shared/BlankCard";
import { useDispatch, useSelector } from "@/store/Store";
import {
  addToCart,
  fetchProducts,
  filterReset,
} from "@/store/apps/eCommerce/ECommerceSlice";
import { ProductType } from "@/types/eCommerce";
import {
  Box,
  Button,
  CardContent,
  Fab,
  Grid,
  Rating,
  Skeleton,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IconBasket, IconMenu2 } from "@tabler/icons-react";
import { filter, orderBy } from "lodash";
import Image from "next/image";
import emptyCart from "public/images/products/empty-shopping-cart.svg";
import React, { useEffect } from "react";
import ProductSearch from "./ProductSearch";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList = ({ onClick }: Props) => {
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getVisibleProduct = (
    products: ProductType[],
    sortBy: string,
    filters: any,
    search: string
  ) => {
    //  SORT BY
    if (sortBy === "newest") {
      products = orderBy(products, ["created"], ["desc"]);
    }
    if (sortBy === "priceDesc") {
      products = orderBy(products, ["price"], ["desc"]);
    }
    if (sortBy === "priceAsc") {
      products = orderBy(products, ["price"], ["asc"]);
    }
    if (sortBy === "discount") {
      products = orderBy(products, ["discount"], ["desc"]);
    }

    // FILTER PRODUCTS
    if (filters.category !== "All") {
      // products = filter(products, (_product) => includes(_product.category, filters.category));
      products = products.filter((_product) =>
        _product.category.includes(filters.category)
      );
    }

    // FILTER PRODUCTS BY GENDER
    if (filters.gender !== "All") {
      products = filter(
        products,
        (_product) => _product.gender === filters.gender
      );
    }

    // FILTER PRODUCTS BY GENDER
    if (filters.color !== "All") {
      products = products.filter((_product) =>
        _product.colors.includes(filters.color)
      );
    }

    // FILTER PRODUCTS BY Search
    if (search !== "") {
      products = products.filter((_product) =>
        _product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    // FILTER PRODUCTS BY Price
    if (filters.price !== "All") {
      const minMax = filters.price ? filters.price.split("-") : "";
      products = products.filter((_product) =>
        filters.price
          ? _product.price >= minMax[0] && _product.price <= minMax[1]
          : true
      );
    }

    return products;
  };

  const getProducts = useSelector((state) =>
    getVisibleProduct(
      state.ecommerceReducer.products,
      state.ecommerceReducer.sortBy,
      state.ecommerceReducer.filters,
      state.ecommerceReducer.productSearch
    )
  );

  //  for alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  //  skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Productos</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <ProductSearch />
        </Box>
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {getProducts.length > 0 ? (
          <>
            {getProducts.map((product) => (
              <Grid
                item
                xs={12}
                lg={4}
                md={4}
                sm={6}
                display="flex"
                alignItems="stretch"
                key={product.id}
              >
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      width={270}
                      height={300}
                      sx={{
                        borderRadius: (theme) => theme.shape.borderRadius / 5,
                      }}
                    />
                  </>
                ) : (
                  <BlankCard className="hoverCard">
                    <Typography>
                      <img src={product.photo} alt="img" width="100%" />
                    </Typography>
                    <Tooltip title="Add To Cart">
                      <Fab
                        size="small"
                        color="primary"
                        onClick={() =>
                          dispatch(addToCart(product)) && handleClick()
                        }
                        sx={{
                          bottom: "75px",
                          right: "15px",
                          position: "absolute",
                        }}
                      >
                        <IconBasket size="16" />
                      </Fab>
                    </Tooltip>
                    <CardContent sx={{ p: 3, pt: 2 }}>
                      <Typography variant="h6">{product.title}</Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1}
                      >
                        <Stack direction="row" alignItems="center">
                          <Typography variant="h6">${product.price}</Typography>
                          <Typography
                            color="textSecondary"
                            ml={1}
                            sx={{ textDecoration: "line-through" }}
                          >
                            ${product.salesPrice}
                          </Typography>
                        </Stack>
                        <Rating
                          name="read-only"
                          size="small"
                          value={product.rating}
                          readOnly
                        />
                      </Stack>
                    </CardContent>
                  </BlankCard>
                )}
                <AlertCart
                  handleClose={handleClose}
                  openCartAlert={cartalert}
                />
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <Box textAlign="center" mt={6}>
                <Image src={emptyCart} alt="cart" width={200} />
                <Typography variant="h2">No existe ningún producto</Typography>
                <Typography variant="h6" mb={3}>
                  El producto que busca ya no está disponible.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => dispatch(filterReset())}
                >
                  Inténtalo de nuevo
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
