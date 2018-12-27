https://www.virtualbox.org/
https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/

These virtual machines expire after 90 days. We recommend setting a snapshot when you first install the virtual machine which you can roll back to later. Mac users will need to use a tool that supports zip64, like The Unarchiver, to unzip the files.
The password to your VM is "Passw0rd!"


- Instalar CD Rom Device
- Instalar guest tools.
- Clipboard copypaste bidirectional
- Subir la memoria gráfica
- Reboot.
- Pasar a seamless mode.
- Localhost
- Hacer screenshot.

Localhost

It suggests using IP: http://10.0.2.2, and it worked for me.

So, I edited the hosts file, C:\windows\system32\drivers\etc\hosts, and added this entry:

10.0.2.2   outer
If you're testing on IE8, remember to put http:// in the address bar. Just putting the ip directly will not work.

For example:

http://10.0.2.2:3000/