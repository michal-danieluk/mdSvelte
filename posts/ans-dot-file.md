---
title: Zarządzanie dotfiles
date: 2023-03-31
---

## Anisble i reszta

Ansible, stow i dotfiels. Trzy elemety, które bardzo ułatwiają życie jeśli chodzi o konfigurację świeżego systemu.

## Ansible

Jest to narzędzie do autamatyzjacji zadań. Możne je wykorzystać do instalacji i konfiguracji oprogramowania i zarządzania serwerami oraz routerami. Pozwala na duża oszczędność czasu. Raz konfigurowane może w łatwy i przystępny sposób zarządzić maszynami które są pod naszą opieką.

Ansible jest dość łatwy w użciu. Opiera się o pliki YAML i działa na zasadzie PUSH. Czyli wysyłą do maszyn opowiednie rządania do wykonania. Myślę, że nawet osobą początkujące będzie potrafiła sobie prodziać z jego prostym użyciem. Dużym plusem jest olbrzymia bibliotek przykładów w dokumentacji Ansible.

## Stow

Stow służy do:
> GNU Stow is a symlink farm manager which takes distinct  packages of software and/or data located in separate  directories on the filesystem, and makes them appear to be installed in the same place.
>  GNU Stow documentation

Wegług ich definicji jest to menadżer symlinków. I dlaczego jest On, aż tak przydatny w naszym przypadku?
Ja prawie wszystkie swoje pliki konfiguracyjne mam w katalogu `dotfiles` który trzymam w repozytorim git na GitHubie. Kiedy przeisntaluję komputer lub przesiadam się na nowy komputer, oczywisćie musi to byś system UNIX, to wystarczy tylko mi sciaganć to repozytorium i odpalić Stow by wyszstyko było skonfigurowane tak jak ja to chce.

## Dotfiles

Jak już można było zauważyć wcześniej dotfiles to moje pliki konfiguracyjne. Mam tam "confy" do takich aplikajci jak:
- i3
- neovim
- tmux
- git
- awesome
- espanso
- itd

Wszystkie one są w moim repozytorium na githubie.

##  Na koniec

Te narzędzia oraz możliwość ich łatwego użycia bardzo oszczędza czas i poprawia wydajność. Szczególnie, że pracuje na aplikacjach wykorzystujących w dużej mierze  skróty klawiszowe.

#blog




