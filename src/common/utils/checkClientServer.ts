const isRunningOnServerSide: boolean = typeof window === "undefined";
const isRunningOnClientSide: boolean = typeof window !== "undefined";

export { isRunningOnServerSide, isRunningOnClientSide };
