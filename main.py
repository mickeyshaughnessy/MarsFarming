import sys
import pygame
import pygame_gui

# Initialize Pygame
pygame.init()

# Set up some constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
FPS = 60

# Create the game window
window_surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

# Load the map image
mars_map = pygame.image.load('maps/viking1200.jpg')

# Create a GUI manager
manager = pygame_gui.UIManager((WINDOW_WIDTH, WINDOW_HEIGHT))

# Main game loop
while True:
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        # Pass the event to the GUI manager
        manager.process_events(event)

        # Check for mouse click
        if event.type == pygame.MOUSEBUTTONDOWN:
            # Open a dialog window
            pygame_gui.windows.UIConfirmationDialog(rect=(100, 100, 400, 200),
                                                    manager=manager,
                                                    window_title='Robot Control',
                                                    action_long_desc='Interact with the robot control software.',
                                                    action_short_name='OK',
                                                    blocking=True)

    # Update the GUI manager
    manager.update(FPS / 1000.0)

    # Draw everything
    window_surface.blit(mars_map, (0, 0))  # Draw the map
    manager.draw_ui(window_surface)

    # Flip the display
    pygame.display.flip()

