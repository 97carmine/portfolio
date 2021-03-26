const isRunningOnServerSide = typeof window === "undefined";

const isRunningOnClientSide = typeof window !== "undefined";

export { isRunningOnServerSide, isRunningOnClientSide };
