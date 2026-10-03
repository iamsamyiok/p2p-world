!macro customInstall
  nsExec::ExecToLog 'netsh advfirewall firewall delete rule name="P2PWorld"'
  nsExec::ExecToLog 'netsh advfirewall firewall add rule name="P2PWorld" dir=in action=allow program="$INSTDIR\P2PWorld.exe" enable=yes profile=any'
  nsExec::ExecToLog 'netsh advfirewall firewall add rule name="P2PWorld" dir=out action=allow program="$INSTDIR\P2PWorld.exe" enable=yes profile=any'
!macroend
!macro customUnInstall
  nsExec::ExecToLog 'netsh advfirewall firewall delete rule name="P2PWorld"'
!macroend
