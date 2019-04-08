# Acmeish

This extension allows you to use system commands to manipulate text you are editing.

It is useful to run simple formatters, text replacement scripts, text insertion and more.
You are only limited by your creativity, see the demo video for ideas.

The project is named after the acme text editor from the plan9 operating system.

## Demo

[youtube video](https://youtu.be/MLxXQcGdYCc)

## Usage

This extension works best with keybindings, though the commands
can be run via the the 'ctrl+shift+p' menu.


To add a keybinding, the following line to your keybindings.json file (File>Preferences>Keyboard Shortcuts):

```
{
	"key": "ctrl+enter",
	"command": "acmeish.runCommand"
},
{
	"key": "ctrl+alt+enter",
	"command": "acmeish.captureCommand"
}
```

To capture a command select the text or move the cursor to a text line and run ```acmeish.captureCommand```.

To run a command run ```acmeish.runCommand``` or click the command entry in the status bar.

To send input to your command, prepend the captured command with '|' e.g. ``` | sort ```,
then select text before running ``` acmeish.runCommand ```.

All commands must complete within 10 seconds or are aborted, they must also exit with a 0 exit code.

## Sponsors

pzmarzly - First! Keep up the good work 

...
YOU - Your message.

## Sponsoring

This command took time and effort to make, please sponsor the project
via this [paypal donation link](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ETKW2M3FS73BL&source=url).

Add a name + message shorter than 70 characters total to your donation it will be added
to the sponsor section. Note that sponsor messages may be rejected at the project
authors judgement.

## Authors

Andrew Chambers
