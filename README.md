<div align="center">

# VSCode Rimraf

[![VSCode marketplace latest version](https://img.shields.io/visual-studio-marketplace/v/luisferlcc.vscode-rimraf?color=blue&logo=visualstudiocode&logoColor=27b4f4)](https://marketplace.visualstudio.com/items?itemName=luisferlcc.vscode-rimraf)
[![VS Marketplace installs](https://img.shields.io/visual-studio-marketplace/i/luisferlcc.vscode-rimraf?label=installs&logo=visualstudiocode&logoColor=27b4f4)](https://marketplace.visualstudio.com/items?itemName=luisferlcc.vscode-rimraf)
[![Contributor Covenant Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-5e0d73)](https://github.com/luisferlcc/vscode-rimraf/blob/master/.github/CODE_OF_CONDUCT.md)

</div>

**VSCode Rimraf** allows you to permanently delete files and folders (similarly to `rm -rf` or `npx rimraf` in the terminal) directly
from the Visual Studio Code GUI.

## Get started

### Installation

Install the extension from the VS Marketplace or by typing this in the Command Palette:

```sh-session
ext install luisferlcc.vscode-rimraf
```

Next, you will see a dialog box warning you that enabling the extension will empty the trash.

<div align="center">
	<img src="https://raw.githubusercontent.com/luisferlcc/vscode-rimraf/HEAD/media/warning.jpg" alt="Trash warning" width="500">
</div>

Make sure to restore any important files in the trash, and then click _Enable_. VSCode Rimraf is now set up.

### Usage

While VSCode Rimraf is enabled, deleting files from the VSCode GUI will delete them permanently instead of moving them to the trash.

![Extension usage](https://raw.githubusercontent.com/luisferlcc/vscode-rimraf/HEAD/media/get-started.gif)

## Commands

-   `vscode-rimraf.toggle` **VSCode Rimraf: Toggle extension** Toggles (enables or disables) the extension. It is reset when opening
    a new window.
-   `vscode-rimraf.empty-trash` **VSCode Rimraf: Empty the trash** Empties the trash.
-   `vscode-rimraf.save-logs` **VSCode Rimraf: Save debug log file** After execution, the extension will automatically save the logs
    generated in the output channel.

## Support

Need help using VSCode Rimraf? Don't hesitate to reach out on
[GitHub Discussions](https://github.com/luisferlcc/vscode-rimraf/discussions/categories/q-a)!

## Links

-   [GitHub](https://github.com/luisferlcc/vscode-rimraf)
-   [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=luisferlcc.vscode-rimraf)

## Contributing

Before creating an issue, please consider the following:

-   Make sure the issue hasn't already been reported or suggested.
-   After following these steps, you can file an issue using one of our
    [templates](https://github.com/luisferlcc/vscode-rimraf/issues/new/choose). Please make sure to follow our
    [Code of Conduct](https://github.com/luisferlcc/vscode-rimraf/blob/master/.github/CODE_OF_CONDUCT.md).
-   If you wish to [submit a pull request](https://github.com/luisferlcc/vscode-rimraf/compare) alongside your issue, please follow
    our [contribution guidelines](https://github.com/luisferlcc/vscode-rimraf/blob/master/.github/CONTRIBUTING.md).
