// If package name is scoped, return the package name without the scope
// e.g. package-name url -> /package-name/-/package-name-1.0.0.tgz
// e.g. @scope/package-name url -> /@scope/package-name/-/package-name-1.0.0.tgz
export const stripOrganisationFromPackageName = (packageName: string): string => {
  const packageNameWithScope: string[] = packageName.split("/");
  return packageNameWithScope.pop() ?? packageName;
};

export const getEncodedPackageName = (packageName: string): string => {
  return encodeURIComponent(packageName);
};
