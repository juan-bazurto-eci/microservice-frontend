import Link from "next/link";
import { CardContent, Typography, Grid, Box } from "@mui/material";
import BlankCard from "../shared/BlankCard";

interface Props {
  complexCard: { title: string; href: string }[];
}

const ComplexCard = ({ complexCard }: Props) => {
  return (
    <Grid container spacing={3}>
      {complexCard.map((card, index) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <Link href={card?.href}>
              <BlankCard className="hoverCard">
                <CardContent>
                  <Box my={3}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="inherit"
                      sx={{ textDecoration: "none" }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </CardContent>
              </BlankCard>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ComplexCard;
