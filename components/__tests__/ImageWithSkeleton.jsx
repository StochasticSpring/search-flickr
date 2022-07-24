import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageWithSkeleton from "../ImageWIthSkeleton";

describe("ImageWithSkeleton", () => {
  it("renders a hidden image and visible skeleton at first", () => {
    const { container } = render(
      <ImageWithSkeleton src={"/image.jpg"} alt={"Image"} />
    );

    const image = screen.getByRole("img", { hidden: true });
    expect(image).toHaveAttribute("src", "/image.jpg");
    expect(image).toHaveAttribute("alt", "Image");

    // MUI uses a <span> which is not on the role list, we will use class name for now
    // TODO: switch to more robust implementation eg test-id, snapshot, etc.
    const elements = container.getElementsByClassName("MuiSkeleton-root");
    expect(elements.length).toBe(1);
    const skeleton = elements[0];
    expect(skeleton).toBeVisible();
  });

  it("shows the image and removes the skeleton when image has loaded", () => {
    const { container } = render(
      <ImageWithSkeleton src={"/image.jpg"} alt={"Image"} />
    );

    const image = screen.getByRole("img", { hidden: true });
    fireEvent.load(image);
    expect(image).toBeVisible();

    // MUI uses a <span> which is not on the role list, we will use class name for now
    // TODO: switch to more robust implementation eg test-id, snapshot, etc.
    const elements = container.getElementsByClassName("MuiSkeleton-root");
    expect(elements.length).toBe(0);
  });
});
