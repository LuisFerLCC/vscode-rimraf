import { ProviderResult, ThemeIcon, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";

export class CustomItem extends TreeItem {
	constructor(override readonly label: string, private readonly folder: boolean) {
		super(label, folder ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None);
	}

	override iconPath = this.folder ? ThemeIcon.Folder : ThemeIcon.File;
}

export class CustomProvider implements TreeDataProvider<CustomItem> {
	getTreeItem(element: CustomItem): CustomItem | Thenable<CustomItem> {
		return element;
	}

	getChildren(): ProviderResult<CustomItem[]> {
		return Promise.resolve([new CustomItem("tsconfig.json", false), new CustomItem(".vscode", true)]);
	}
}
