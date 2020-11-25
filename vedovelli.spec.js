import { render, screen } from "@testing-library/react";
import Vedovelli, { getServerSideProps } from "./pages/vedovelli";
import Axios from "axios";

jest
  .spyOn(Axios, "get")
  .mockImplementation(() => Promise.resolve({ data: [{ id: 1 }, { id: 2 }] }));

/*
 * O componente é montado fora do Nextjs.
 * Isso significa que o método getServerSideProps
 * nunca é executado. Mas ele pode ser testado.
 */
describe("getServerSideProps", () => {
  it("should call Axios.get 1 time", async () => {
    const { props } = await getServerSideProps();

    expect(Axios.get).toHaveBeenCalledTimes(1);
    expect(props).toBeDefined();
    expect(Array.isArray(props.repos)).toBe(true);
    expect(props.repos).toHaveLength(2);
  });
});

describe("Vedovelli", () => {
  it("should render the component", async () => {
    render(<Vedovelli repos={[]} />);
    expect(screen.getByTestId("repos")).toBeInTheDocument();
  });

  it("should render 2 repos", async () => {
    const repos = [{ id: 1 }, { id: 2 }];
    render(<Vedovelli repos={repos} />);
    expect(screen.getAllByTestId("repo")).toHaveLength(2);
  });
});
