# Editor Format - Smart Code Editor

A powerful uTools plugin that provides multi-language code formatting, syntax highlighting, and editing features.

## 🚀 Features

### Core Features

- **🖱️ Middle-click Quick Launch**: Click the middle mouse button to quickly launch uTools and automatically open the editor, pre-loading content from the clipboard.
- **Multi-language Support**: Automatically detects and highlights various programming languages such as JSON, JavaScript, Java, SQL, HTML, Shell, and more.
- **Smart Formatting**: One-click code formatting with support for custom indentation and styles.
- **Real-time Syntax Highlighting**: Provides a professional-grade code editing experience based on Monaco Editor.
- **Search and Replace**: Powerful search and replace functionality with support for regular expressions.
- **Go to Line**: Quickly jump to a specific line number.
- **Theme Switching**: Supports switching between light and dark themes.
- **📋 Global Text Selection**: Select text anywhere, then use a uTools hotkey to launch the plugin and import the selected content directly.
- **📋 Smart Clipboard Integration**: Automatically reads clipboard content, supports one-click paste and copy, and automatically focuses and positions the cursor.

### JSON-specific Features

- **Key Sorting**: Sort keys by name from A-Z or Z-A.
- **Code Minification**: Remove spaces and newlines to generate a compact format.
- **Escape Handling**:
  - Escape: Convert JSON to a string format.
  - Unescape: Parse an escaped JSON string.

### Other Features

- **🚀 Multi-instance Support**: Supports opening multiple editor windows simultaneously, with each instance's content being completely independent.
- **Full-screen Mode**: Provides a distraction-free editing environment.
- **Copy Function**: One-click to copy all content to the system clipboard.
- **Paste Function**: One-click to paste clipboard content into the editor.
- **Real-time Stats**: Displays line count, character count, and cursor position.
- **Smart Launch**: Supports launching with selected text or as a blank editor.

## 📦 Installation Requirements

### System Requirements

- **Operating System**: Windows 10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- **uTools Version**: 2.0.0 and above
- **Memory**: At least 512MB of available RAM
- **Network**: Internet connection required (for loading Monaco Editor and related libraries)

### Software Dependencies

1. **uTools**:
   - Download at: https://www.u-tools.cn
   - Install and activate uTools.
2. **uTools Developer Tools** (Only required for development):
   - Search for "uTools Developer Tools" in the uTools plugin market.
   - Install and acquire the developer tools.

### External Dependencies (Auto-loaded)

- Monaco Editor (v0.48.0) - Core code editor
- Tailwind CSS - UI styling framework
- js-beautify (v1.15.1) - JavaScript/Java code formatting
- node-sql-parser - SQL statement parsing and formatting

## 🛠️ Installation Method

### Method One: Via uTools Developer Tools (Recommended)

1. Open the uTools Developer Tools.
2. Click "New Project" or "Import Project".
3. Select this project's `plugin.json` file.
4. Click "Start Development".
5. Enter a keyword in uTools to launch the plugin.

### Method Two: Manual Installation

1. Ensure the project folder contains the following files:

   ```
   editor-format/
   ├── plugin.json      # Plugin configuration file
   ├── index.html       # Main interface file
   ├── logo.png         # Plugin icon
   └── README.md        # Documentation
   ```

2. Open the uTools Developer Tools.

3. Import the entire folder.

## 🎯 How to Use

### Launching the Plugin

#### Method 1: Middle-click Quick Launch (⭐ New Feature)

1. **Selected Text Priority**: First, select any text, then click the middle mouse button to bring up uTools.

   - The plugin will automatically appear as "Quick Edit Selected Text".
   - A notification will show: "Quick Editor started, loaded selected text, X characters total."

2. **Clipboard Content Fallback**: If no text is selected, simply click the middle mouse button.

   - The plugin will automatically appear as "Quick Editor".
   - It will automatically load the clipboard content into the editor.
   - A notification will show: "Quick Editor started, loaded clipboard content, X characters total."

3. **Smart Workflow**:

   ```
   Select text → Middle-click → Directly edit the selected content
   or
   Middle-click → Auto-load clipboard → Start editing
   ```

   - The editor automatically gains focus, with the cursor placed at the end of the content, ready for immediate editing.

#### Method 2: Global Text Selection (Recommended)

1. **Select Any Text**: In any application, select the code text you want to format.
2. **Bring up uTools**: Use the uTools global hotkey (default Alt+Space or custom hotkey).
3. **Direct Launch**: The plugin will automatically recognize the selected text and launch the formatting function directly.
   - A notification will show: "Acquired selected text, X characters total."
   - The editor will automatically load the selected content and perform language detection.

#### Method 3: Keyword Launch

Enter any of the following keywords in uTools:

- `code format`
- `editor-format`
- `code editor`
- `json format`
- `sql format`
- `java format`
- `javascript format`
- `html format`
- `code beautify`
- `format tool`

#### Method 4: Clipboard Mode

1. Copy the code you want to format to the clipboard.
2. Launch the plugin using a keyword.
3. The plugin will automatically detect and load the clipboard content.
   - A notification will show: "Loaded clipboard content, X characters total."
   - The editor will automatically be filled with the clipboard content.

### Basic Operations

1. **Loading Content**:
   - Launch with selected text: Automatically loads the selected text.
   - Launch with keyword: Automatically loads clipboard content.
   - Manual input: Directly type code into the editor.
2. **Multi-instance Use**:
   - You can launch multiple editor instances simultaneously.
   - Each instance displays a unique ID in the window title (e.g., Smart Code Editor #1234).
   - The content of each instance is completely independent.
   - You can edit different code snippets at the same time.
3. **Auto-detection**: The plugin automatically detects the code language and applies syntax highlighting.
4. **Formatting**: Click the "Format" button in the top menu bar to beautify the code.
5. **Theme Switching**: Click the "Theme" button to switch between light and dark themes.
6. **Searching**: Click the "Search" button or use Ctrl+F to find text.
7. **Clipboard Operations**:
   - Click the "Paste from Clipboard" button to import the latest clipboard content.
   - Click the "Copy" button to copy the editor's content to the clipboard.

### Special JSON Operations

When JSON format is detected, additional function buttons will appear:

- **A-Z**: Sort keys by name from A-Z.
- **Z-A**: Sort keys by name from Z-A.
- **Minify**: Remove formatting to generate single-line JSON.
- **Escape**: Convert the JSON object into a string format.
- **Unescape**: Parse an escaped JSON string.

## 🔧 Keyboard Shortcuts

- `Ctrl+F` / `Cmd+F`: Search
- `Ctrl+H` / `Cmd+H`: Replace
- `Ctrl+G` / `Cmd+G`: Go to Line
- `F11`: Toggle Full Screen
- `Ctrl+A` / `Cmd+A`: Select All
- `Ctrl+C` / `Cmd+C`: Copy
- `Ctrl+V` / `Cmd+V`: Paste

## 📝 Supported Language Formats

| Language   | Formatting | Syntax Highlighting | Auto-detection |
| ---------- | ---------- | ------------------- | -------------- |
| JSON       | ✅          | ✅                   | ✅              |
| JavaScript | ✅          | ✅                   | ✅              |
| Java       | ✅          | ✅                   | ✅              |
| SQL        | ✅          | ✅                   | ✅              |
| HTML       | ✅          | ✅                   | ✅              |
| CSS        | ✅          | ✅                   | ✅              |
| XML        | ✅          | ✅                   | ✅              |
| Shell      | ⚡          | ✅                   | ✅              |
| Python     | ⚡          | ✅                   | ⚡              |
| C/C++      | ⚡          | ✅                   | ⚡              |
| TypeScript | ⚡          | ✅                   | ⚡              |

> ✅ Fully supported | ⚡ Basic support

## 🐛 FAQ

### Q: The plugin fails to start?

A:

1. Check if the uTools version is 2.0.0 or higher.
2. Verify that the `plugin.json` file is correctly formatted.
3. Check your network connection to ensure external resources can be loaded.

### Q: How to use the multi-instance feature?

A:

1. **Launch Multiple Instances**: You can start multiple editors simultaneously in the following ways:
   - Method 1: Select text in different locations and launch the plugin with uTools for each one.
   - Method 2: Repeatedly enter a keyword (like "code format") to launch new instances.
   - Method 3: Use the middle mouse button at different times to launch multiple instances.
2. **Instance Differentiation**: The window title and status bar of each instance will display a different instance ID.
3. **Independent Content**: The content of each instance is completely separate and does not affect others.
4. **Instance Management**: You can switch between different editor instances using the taskbar or Alt+Tab.

### Q: The formatting feature doesn't work?

A:

1. Confirm that the code syntax is correct.
2. Check if formatting is supported for that language.
3. Try manually selecting the language type.

### Q: Cannot load Monaco Editor?

A:

1. Check your network connection.
2. Ensure your firewall is not blocking CDN resources.
3. Try refreshing or restarting the plugin.

## 📄 Version Information

- **Current Version**: 1.0.0
- **Developer**: Developer
- **Compatible Platforms**: Windows, macOS, Linux

## 📞 Technical Support

If you encounter problems or have suggestions for improvement, please contact us via the following methods:

- Leave a message in the uTools plugin market.
- Submit a GitHub Issue (if available).

**Enjoy an efficient code editing experience!** 🎉
