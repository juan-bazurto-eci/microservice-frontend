import { configureStore } from "@reduxjs/toolkit";
import customizerReducer, {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow,
} from "@/store/customizer/CustomizerSlice";

describe("Customizer Slice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        customizer: customizerReducer,
      },
    });
  });

  it("should set theme", () => {
    store.dispatch(setTheme("GREEN_THEME"));
    expect(store.getState().customizer.activeTheme).toBe("GREEN_THEME");
  });

  it("should set dark mode", () => {
    store.dispatch(setDarkMode("dark"));
    expect(store.getState().customizer.activeMode).toBe("dark");
  });

  it("should set direction", () => {
    store.dispatch(setDir("rtl"));
    expect(store.getState().customizer.activeDir).toBe("rtl");
  });

  it("should toggle sidebar", () => {
    store.dispatch(toggleSidebar());
    expect(store.getState().customizer.isCollapse).toBe(true);

    store.dispatch(toggleSidebar());
    expect(store.getState().customizer.isCollapse).toBe(false);
  });
  it("should set hover sidebar", () => {
    store.dispatch(hoverSidebar(true));
    expect(store.getState().customizer.isSidebarHover).toBe(true);

    store.dispatch(hoverSidebar(false));
    expect(store.getState().customizer.isSidebarHover).toBe(false);
  });

  it("should toggle mobile sidebar", () => {
    store.dispatch(toggleMobileSidebar());
    expect(store.getState().customizer.isMobileSidebar).toBe(true);

    store.dispatch(toggleMobileSidebar());
    expect(store.getState().customizer.isMobileSidebar).toBe(false);
  });

  it("should toggle layout", () => {
    store.dispatch(toggleLayout("full"));
    expect(store.getState().customizer.isLayout).toBe("full");

    store.dispatch(toggleLayout("boxed"));
    expect(store.getState().customizer.isLayout).toBe("boxed");
  });

  it("should set border radius", () => {
    store.dispatch(setBorderRadius(10));
    expect(store.getState().customizer.borderRadius).toBe(10);
  });

  it("should toggle horizontal", () => {
    store.dispatch(toggleHorizontal(true));
    expect(store.getState().customizer.isHorizontal).toBe(true);

    store.dispatch(toggleHorizontal(false));
    expect(store.getState().customizer.isHorizontal).toBe(false);
  });

  it("should set language", () => {
    store.dispatch(setLanguage("es"));
    expect(store.getState().customizer.isLanguage).toBe("es");
  });

  it("should set card shadow", () => {
    store.dispatch(setCardShadow(false));
    expect(store.getState().customizer.isCardShadow).toBe(false);

    store.dispatch(setCardShadow(true));
    expect(store.getState().customizer.isCardShadow).toBe(true);
  });
});
