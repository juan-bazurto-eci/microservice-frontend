import React from "react";
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  FormGroup,
  ListItemIcon,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "@/store/Store";
import { ProductFiterType } from "@/types/eCommerce";
import {
  IconAd2,
  IconCheck,
  IconCircles,
  IconDeviceLaptop,
  IconHanger,
  IconMoodSmile,
  IconNotebook,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import {
  filterProducts,
  filterReset,
  sortByColor,
  sortByGender,
  sortByPrice,
  sortByProducts,
} from "@/store/apps/eCommerce/ECommerceSlice";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ecommerceReducer.products);
  const active = useSelector((state) => state.ecommerceReducer.filters);
  const checkactive = useSelector((state) => state.ecommerceReducer.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const getUniqueData = (data: string[], attr: any) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    if (attr === "colors") {
      newVal = newVal.flat();
    }

    return (newVal = ["All", ...Array.from(new Set(newVal))]);
  };

  const filterbyGender = getUniqueData(products, "gender");
  const filterbyColors = getUniqueData(products, "colors");

  const filterCategory: ProductFiterType[] = [
    {
      id: 1,
      filterbyTitle: "Filtrar por categoría",
    },
    {
      id: 2,
      name: "Todo",
      sort: "All",
      icon: IconCircles,
    },
    {
      id: 3,
      name: "Moda",
      sort: "fashion",
      icon: IconHanger,
    },
    {
      id: 9,
      name: "libros",
      sort: "books",
      icon: IconNotebook,
    },
    {
      id: 10,
      name: "Juguetes",
      sort: "toys",
      icon: IconMoodSmile,
    },
    {
      id: 11,
      name: "Electrónica",
      sort: "electronics",
      icon: IconDeviceLaptop,
    },
    {
      id: 6,
      devider: true,
    },
  ];
  const filterbySort = [
    { id: 1, value: "newest", label: "Más reciente", icon: IconAd2 },
    {
      id: 2,
      value: "priceDesc",
      label: "Precio: Alto-Bajo",
      icon: IconSortAscending2,
    },
    {
      id: 3,
      value: "priceAsc",
      label: "Precio: Bajo-Alto",
      icon: IconSortDescending2,
    },
    { id: 4, value: "discount", label: "Con descuento", icon: IconAd2 },
  ];
  const filterbyPrice = [
    {
      id: 0,
      label: "Todo",
      value: "All",
    },
    {
      id: 1,
      label: "0-50",
      value: "0-50",
    },
    {
      id: 3,
      label: "50-100",
      value: "50-100",
    },
    {
      id: 4,
      label: "100-200",
      value: "100-200",
    },
    {
      id: 5,
      label: "Más de 200",
      value: "200-99999",
    },
  ];

  const handlerGenderFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      dispatch(sortByGender({ gender: value.target.value }));
    }
  };
  const handlerPriceFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      dispatch(sortByPrice({ price: value.target.value }));
    }
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography
                variant="subtitle2"
                fontWeight={600}
                px={3}
                mt={2}
                pb={2}
                key={filter.id}
              >
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.devider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={active.category === `${filter.sort}`}
              onClick={() =>
                dispatch(filterProducts({ category: `${filter.sort}` }))
              }
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* ------------------------------------------- */}
        {/* Sort by */}
        {/* ------------------------------------------- */}
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          Ordenar por
        </Typography>
        {filterbySort.map((filter) => {
          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={checkactive === `${filter.value}`}
              onClick={() => dispatch(sortByProducts(`${filter.value}`))}
              key={filter.id + filter.label + filter.value}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <filter.icon stroke="1.5" size={19} />
              </ListItemIcon>
              <ListItemText>{filter.label}</ListItemText>
            </ListItemButton>
          );
        })}
        <Divider />
        {/* ------------------------------------------- */}
        {/* Filter By Gender */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            Por género
          </Typography>
          <br />
          <FormGroup>
            {filterbyGender.map((gen) => (
              <FormControlLabel
                key={gen}
                control={
                  <Radio
                    value={gen}
                    checked={active.gender === gen}
                    onChange={handlerGenderFilter}
                  />
                }
                label={gen}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider />
        {/* ------------------------------------------- */}
        {/* Filter By Pricing */}
        {/* ------------------------------------------- */}
        <Typography variant="h6" px={3} mt={3} pb={2}>
          By Pricing
        </Typography>
        <Box p={3} pt={0}>
          <FormGroup>
            {filterbyPrice.map((price) => (
              <FormControlLabel
                key={price.label}
                control={
                  <Radio
                    value={price.value}
                    checked={active.price === price.value}
                    onChange={handlerPriceFilter}
                  />
                }
                label={price.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider />
        <Typography variant="h6" px={3} mt={3} pb={2}>
          Por colores
        </Typography>
        {/* ------------------------------------------- */}
        {/* Filter By colors */}
        {/* ------------------------------------------- */}
        <Box p={3} pt={0}>
          <Stack direction={"row"} flexWrap="wrap" gap={1}>
            {filterbyColors.map((curColor) => {
              if (curColor !== "All") {
                return (
                  <Avatar
                    sx={{
                      backgroundColor: curColor,
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                    aria-label={curColor}
                    key={curColor}
                    onClick={
                      active.color === curColor
                        ? () => dispatch(sortByColor({ color: "All" }))
                        : () => dispatch(sortByColor({ color: curColor }))
                    }
                  >
                    {active.color === curColor ? <IconCheck size="13" /> : ""}
                  </Avatar>
                );
              } else {
                return <Box key={curColor} sx={{ display: "none" }} />;
              }
            })}
          </Stack>
        </Box>
        <Divider />
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button
            variant="contained"
            onClick={() => dispatch(filterReset())}
            fullWidth
          >
            Restablecer filtros
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
