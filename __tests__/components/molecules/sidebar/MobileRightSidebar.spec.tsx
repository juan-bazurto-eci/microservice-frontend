import { render } from "@testing-library/react";
import MobileRightSidebar from "@/components/molecules/sidebar/MobileRightSidebar";

describe("MobileRightSidebar component", () => {
  it("renders drawer closed initially", () => {
    render(<MobileRightSidebar />);
  });
});
