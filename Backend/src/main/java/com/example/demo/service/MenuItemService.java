package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.MenuItem;
import com.example.demo.repository.MenuRepo;

@Service
public class MenuItemService {

    @Autowired
    private MenuRepo menuRepository;

    @Transactional(readOnly = true)
    public List<MenuItem> getMenuItems() {
        return menuRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getMenuItem(long id, String menuType) {
        return menuRepository.getMenuItem(id, menuType);
    }

    @Transactional
    public MenuItem postMenuItem(MenuItem menuItem) {
        return menuRepository.save(menuItem);
    }

    @Transactional
    public MenuItem editMenuItem(MenuItem menuItem, long id) {
        return menuRepository.findById(id)
                .map(existingMenuItem -> {
                    existingMenuItem.setName(menuItem.getName());
                    existingMenuItem.setDescription(menuItem.getDescription());
                    existingMenuItem.setPrice(menuItem.getPrice());
                    return menuRepository.save(existingMenuItem);
                })
                .orElse(null);
    }

    @Transactional
    public boolean deleteMenuItem(long id) {
        Optional<MenuItem> menuItem = menuRepository.findById(id);
        if (menuItem.isPresent()) {
            menuRepository.delete(menuItem.get());
            return true;
        }
        return false;
    }

    public List<MenuItem> getMenus(String searchTerm) {
        return menuRepository.findByMenuName(searchTerm);
    }

    public List<MenuItem> getMenusByType(String type) {
        return menuRepository.getMenusByType(type);
    }

    public List<MenuItem> getMenuBySort(String type, String sortBy) {
        Sort sort = Sort.unsorted();
        
        switch(sortBy) {
            case "Rating":
                sort = Sort.by("rating").descending();
                break;
            case "CostLowtoHigh":
                sort = Sort.by("price").ascending();
                break;
            case "CostHightoLow":
                sort = Sort.by("price").descending();
                break;
            default:
                sort = Sort.unsorted();
        }

        return menuRepository.findByType(type, sort);
    }
    public Optional<MenuItem> getMenuItemById(Long id)
    {
        return menuRepository.findById(id);
    }

    public Long findByName(String name)
    {    
        
        Optional<MenuItem> m=menuRepository.findByName(name);
        return m.map(MenuItem::getId).orElse(null);
    }
    

}
