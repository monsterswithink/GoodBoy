import UIKit

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
        
        // Set up the webview to load our Ionic keyboard
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
               let keyType = keyInfo["type"] as? String,
               let keyValue = keyInfo["value"] as? String {
                
                // Handle different key types
                switch keyType {
                case "character":
                    // Insert the character
                    textDocumentProxy.insertText(keyValue)
                    
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
                    // Handle arrow keys
                    switch keyValue {
                    case "left":
                        textDocumentProxy.adjustTextPosition(byCharacterOffset: -1)
                    case "right":
                        textDocumentProxy.adjustTextPosition(byCharacterOffset: 1)
                    default:
                        break
                    }
                    
                default:
                    break
                }
            }
        }
    }
}
