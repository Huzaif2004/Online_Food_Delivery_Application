package com.example.demo.controller;

import com.example.demo.model.MenuItem;
import com.example.demo.repository.MenuRepo;
import com.example.demo.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;
    @Autowired
    private MenuRepo menuItemRepository;
 
    @GetMapping("/menuitems")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemService.getMenuItems();
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }
    
    @GetMapping("/menuitems/{id}")
    public ResponseEntity<List<MenuItem>> getMenuItem(@PathVariable long id, 
                                                      @RequestParam(name="menuType") String menuType) {
        List<MenuItem> menuItems = menuItemService.getMenuItem(id, menuType);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }
    
    @PostMapping(value = "/menuitems", consumes = "application/json", produces = "application/json")
    public ResponseEntity<MenuItem> postMenuItem(@RequestBody MenuItem menuItem) {
        MenuItem createdMenuItem = menuItemService.postMenuItem(menuItem);
        return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
    }
  
    @PutMapping(value = "/menuitems/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<MenuItem> editMenuItem(@RequestBody MenuItem menuItem, @PathVariable long id) {
        MenuItem updatedMenuItem = menuItemService.editMenuItem(menuItem, id);
        if (updatedMenuItem != null) {
            return new ResponseEntity<>(updatedMenuItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/menuitems/{id}")
    public ResponseEntity<HttpStatus> deleteMenuItem(@PathVariable long id) {
        boolean isRemoved = menuItemService.deleteMenuItem(id);
        if (isRemoved) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/menuitems/search")
    public ResponseEntity<List<MenuItem>> getMenus(@RequestParam(name="searchTerm") String searchTerm) {
        List<MenuItem> menuItems = menuItemService.getMenus(searchTerm);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    @GetMapping("/menuitems/type")
    public ResponseEntity<List<MenuItem>> getMenusByType(@RequestParam(name="type") String type) {
        List<MenuItem> menuItems = menuItemService.getMenusByType(type);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    @GetMapping("/menuitems/sort")
    public ResponseEntity<List<MenuItem>> getMenuBySort(@RequestParam(value="menuType", defaultValue="All") String menuType,
                                                        @RequestParam(value="sortBy", defaultValue="Rating") String sortBy) {
        List<MenuItem> menuItems = menuItemService.getMenuBySort(menuType, sortBy);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }


    @GetMapping("/hotels/hotelIdByMenu/{menuId}")
    public ResponseEntity<Long> getHotelIdByMenuId(@PathVariable Long menuId) {
        MenuItem menuItem = menuItemRepository.findById(menuId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));
        Long hotelId = menuItem.getHotel().getHotelId();  // Assuming getHotel() returns the associated HotelModel
        return ResponseEntity.ok(hotelId);
    }
    @GetMapping("/menu/{id}")
    public Optional<MenuItem> getMenuItemById(@PathVariable Long id)
    {
        return menuItemService.getMenuItemById(id);
    }
    @GetMapping("/menu/name")
    public Long getMenuByName(@RequestParam(name="menuName") String name)
    {
        return menuItemService.findByName(name);
    }
}




