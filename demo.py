import subprocess
import platform

def sleep_computer():
    if platform.system() == "Windows":
        subprocess.call(["rundll32.exe", "powrprof.dll", "SetSuspendState", "0", "1", "0"])  # Đưa máy vào chế độ ngủ trên Windows
    elif platform.system() == "Darwin":
        subprocess.call(["pmset", "sleepnow"])  # Đưa máy vào chế độ ngủ trên macOS
    elif platform.system() == "Linux":
        subprocess.call(["systemctl", "suspend"])  # Đưa máy vào chế độ ngủ trên Linux

if __name__ == "__main__":
    sleep_computer()
