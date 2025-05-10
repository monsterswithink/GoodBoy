import UIKit
import WebKit

class KeyboardViewController: UIInputViewController {
    
    @IBOutlet var nextKeyboardButton: UIButton!
    
    // This will hold our webview that loads the Ionic app
    var webView: WKWebView!
    
    override func updateViewConstraints() {
        super.updateViewConstraints()
        
        // Add custom view sizing constraints here
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Set up the webview to load our Ionic app
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = WKUserContentController()
        
        // Add a script message handler to receive key press events from JavaScript
        configuration.userContentController.add(self, name: "keyboardHandler")
        
        webView = WKWebView(frame: view.frame, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        
        // Load the Ionic keyboard HTML
        if let keyboardURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "public") {
            webView.loadFileURL(keyboardURL, allowingReadAccessTo: keyboardURL.deletingLastPathComponent())
        }
        
        view.addSubview(webView)
        
        // Set up the next keyboard button
        nextKeyboardButton = UIButton(type: .system)
        nextKeyboardButton.setTitle(NSLocalizedString("Next Keyboard", comment: "Title for 'Next Keyboard' button"), for: [])
        nextKeyboardButton.sizeToFit()
        nextKeyboardButton.translatesAutoresizingMaskIntoConstraints = false
        nextKeyboardButton.addTarget(self, action: #selector(handleInputModeList(from:with:)), for: .allTouchEvents)
        
        view.addSubview(nextKeyboardButton)
        
        // Add constraints for the next keyboard button
        NSLayoutConstraint.activate([
            nextKeyboardButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 10),
            nextKeyboardButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -10),
        ])
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        
        // Update the webview frame when the view layout changes
        webView.frame = view.bounds
    }
    
    override func textWillChange(_ textInput: UITextInput?) {
        // The text is about to change
    }
    
    override func textDidChange(_ textInput: UITextInput?) {
        // The text has changed
    }
}

// MARK: - WKScriptMessageHandler
extension KeyboardViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // Handle messages from JavaScript
        if message.name == "keyboardHandler" {
            if let keyInfo = message.body as? [String: Any],
               let keyType = keyInfo["type"] as? String {
                
                // Handle different key types
                switch keyType {
                case "character":
                    if let keyValue = keyInfo["value"] as? String {
                        // Insert the character
                        textDocumentProxy.insertText(keyValue)
                    }
                    
                case "delete":
                    // Delete the character before the cursor
                    textDocumentProxy.deleteBackward()
                    
                case "return":
                    // Insert a new line
                    textDocumentProxy.insertText("\n")
                    
                case "space":
                    // Insert a space
                    textDocumentProxy.insertText(" ")
                    
                case "tab":
                    // Insert a tab
                    textDocumentProxy.insertText("\t")
                    
                case "arrow":
                    if let keyValue = keyInfo["value"] as? String {
                        // Handle arrow keys
                        switch keyValue {
                        case "left":
                            textDocumentProxy.adjustTextPosition(byCharacterOffset: -1)
                        case "right":
                            textDocumentProxy.adjustTextPosition(byCharacterOffset: 1)
                        default:
                            break
                        }
                    }
                    
                case "combination":
                    // Handle key combinations
                    if let action = keyInfo["value"] as? String {
                        handleKeyCombination(action)
                    }
                    
                case "unicode":
                    // Handle Unicode characters
                    if let unicodeChar = keyInfo["value"] as? String {
                        textDocumentProxy.insertText(unicodeChar)
                    }
                    
                case "modifier":
                    // Handle modifier keys
                    if let modifierAction = keyInfo["value"] as? String {
                        if modifierAction == "switchKeyboard" {
                            // Switch to next keyboard
                            advanceToNextInputMode()
                        }
                    }
                    
                default:
                    break
                }
            }
        }
    }
    
    // Handle macOS-style key combinations
    private func handleKeyCombination(_ action: String) {
        switch action {
        case "copy":
            // Request copy operation from the system
            UIPasteboard.general.string = textDocumentProxy.selectedText
            
        case "paste":
            // Paste from clipboard
            if let string = UIPasteboard.general.string {
                textDocumentProxy.insertText(string)
            }
            
        case "cut":
            // Cut selected text
            if let selectedText = textDocumentProxy.selectedText {
                UIPasteboard.general.string = selectedText
                textDocumentProxy.deleteBackward()
            }
            
        case "selectAll":
            // Select all text
            // Note: This requires custom implementation as UITextDocumentProxy doesn't support this directly
            
        case "undo", "redo":
            // These would require integration with the app's undo manager
            
        case "bold", "italic", "underline":
            // These would require integration with text styling APIs
            
        case "save":
            // This would require integration with the app's save functionality
            
        case "find":
            // This would require integration with the app's search functionality
            
        case "moveToLineStart":
            // Move cursor to start of line
            // This requires custom implementation
            
        case "moveToLineEnd":
            // Move cursor to end of line
            // This requires custom implementation
            
        case "moveToDocStart":
            // Move cursor to start of document
            // This requires custom implementation
            
        case "moveToDocEnd":
            // Move cursor to end of document
            // This requires custom implementation
            
        case "moveWordLeft":
            // Move cursor one word left
            // This requires custom implementation
            
        case "moveWordRight":
            // Move cursor one word right
            // This requires custom implementation
            
        case "deleteToLineStart":
            // Delete from cursor to start of line
            // This requires custom implementation
            
        case "deleteWord":
            // Delete the word before the cursor
            // This requires custom implementation
            
        default:
            break
        }
    }
}

// Extension to add selectedText property to UITextDocumentProxy
extension UITextDocumentProxy {
    var selectedText: String? {
        // This is a placeholder - iOS doesn't provide direct access to selected text
        // In a real implementation, you would need to track selection state
        return nil
    }
}
