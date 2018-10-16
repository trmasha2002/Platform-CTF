# -*- mode: ruby -*-
# vi: set ft=ruby :
puts \
'___  ___ _____ _   _ ______   _____  __    _____ _____  ___  ___  ___
|  \/  |/  ___| | | || ___ \ |____ |/  |  |_   _|  ___|/ _ \ |  \/  |
| .  . |\ `--.| |_| || |_/ /     / /`| |    | | | |__ / /_\ \| .  . |
| |\/| | `--. \  _  ||  __/      \ \ | |    | | |  __||  _  || |\/| |
| |  | |/\__/ / | | || |     .___/ /_| |_   | | | |___| | | || |  | |
\_|  |_/\____/\_| |_/\_|     \____/ \___/   \_/ \____/\_| |_/\_|  |_/'
Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end
  config.vm.box = "bento/ubuntu-16.04"
  config.vm.box_version = "201802.02.0"
  # config.vm.box_check_update = false
  config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true
  config.vm.network "forwarded_port", guest: 5000, host: 5000, auto_correct: true
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.network "private_network", ip: "192.168.0.101"
  config.vm.synced_folder "./", "/home/vagrant/project", type: "rsync", rsync__args: ["--verbose", "--archive", "--delete", "-z"]
  config.vm.provision :shell, :path => "configure_vm.sh"
end
