## get-definition

Serves as `VSCode` extension in which:
- Highlighted text representing a known Win32 API function is queried to identify the correct DLL it originates from
- If successful, the `DFR` syntax for the function is displayed as a notification window
- If successful, the relevant header file to include is displayed as a notification window

Usage:
- Use the precompiled release package
- Add the extension using the "Install from VSIX" option within the `VSCode` extensions menu
- When using a function, e.g., `CreateFileA`
  -  Highlight `CreateFileA` in the current window
  -  `CTRL + SHIFT + P` / `COMMAND + SHIFT + P`
  -  `Obtain External Definition`
  -  Hit `Enter` / `Return`
