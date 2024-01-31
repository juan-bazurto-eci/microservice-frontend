import { Card } from "@mui/material";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
  sx?: any;
};

const BlankCard = ({ children, className, sx }: Props) => {
  return (
    <Card
      sx={{
        p: 0,
        border: "none",
        position: "relative",
        sx,
      }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
